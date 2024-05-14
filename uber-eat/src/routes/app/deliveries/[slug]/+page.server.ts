import { error, redirect } from "@sveltejs/kit";
import axios from "axios";

export async function load({ params, request, cookies }) {
  try {
    const deliverie = await axios({
      method: "GET",
      url: `https://ubereatlike-api.logan-eono.fr/api/deliveries/${params.slug}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("user_token")}`,
      },
    });

    return {
      deliverie: deliverie.data,
    };
  } catch (error) {
    cookies.delete("user_token", { path: "/" });
    redirect(302, "/auth/login");
  }
}

export const actions = {
  default: async ({ params, request, cookies }) => {
    
  }
}
