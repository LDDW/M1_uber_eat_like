import { error, redirect } from "@sveltejs/kit";
import axios from "axios";

export async function load({ params, cookies }) {
  try {
    const restaurant = await getRestaurant(params.slug, cookies);
    const menus = await getMenus(params.slug, cookies);
    const dishes = await getDishes(params.slug, cookies);

    return {
      restaurant: restaurant.data,
      menus: menus.data["hydra:member"],
      dishes: dishes.data["hydra:member"],
    };
  } catch (error) {
    cookies.delete("user_token", { path: "/" });
    redirect(302, "/auth/login");
  }
}

async function getMenus(id_restaurant: number, cookies: any) {
  return await axios({
    method: "GET",
    url: `https://ubereatlike-api.logan-eono.fr/api/restaurants/${id_restaurant}/menus`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("user_token")}`,
    },
  });
}

async function getDishes(id_restaurant: number, cookies: any) {
  return await axios({
    method: "GET",
    url: `https://ubereatlike-api.logan-eono.fr/api/restaurants/${id_restaurant}/dishes`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("user_token")}`,
    },
  });
}

async function getRestaurant(id_restaurant: number, cookies: any) {
  return await axios({
    method: "GET",
    url: `https://ubereatlike-api.logan-eono.fr/api/restaurants/${id_restaurant}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("user_token")}`,
    },
  });
}

export const actions = {
  default: async ({ cookies, request, resolve }) => {
    const formData = await request.formData();
    const data = JSON.parse(formData.get("cartData"));
    const orderItems = [];

    data[0].products.forEach((product) => {
      if (product["@type"] === "Dish") {
        orderItems.push({
          dish: product["@id"],
        });
      } else if (product["@type"] === "Menu") {
        orderItems.push({
          menu: product["@id"],
        });
      }
    });

    try {
      const res = await axios({
        method: "POST",
        url: `https://ubereatlike-api.logan-eono.fr/api/deliveries`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("user_token")}`,
        },
        data: {
          restaurant: data[0].restaurant["@id"],
          orderItems: orderItems,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
