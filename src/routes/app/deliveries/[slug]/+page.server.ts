import axios from "axios";

export async function load({ params, cookies }) {
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
    console.log(error);
  }
}
