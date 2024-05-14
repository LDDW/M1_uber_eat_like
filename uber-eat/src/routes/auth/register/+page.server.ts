import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import axios from "axios";

export function load({ cookies }) {
  if (cookies.get("user_token")) {
    return redirect(302, "/app");
  }
}

export const actions = {
  default: async ({ cookies, request }) => {
    const formData = await request.formData();

    try {
      const res = await axios({
        method: "post",
        url: "https://ubereatlike-api.logan-eono.fr/api/customers",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user: {
            identifier: formData.get("email"),
            plainPassword: formData.get("password"),
          },
          civility: formData.get("civility"),
          firstName: formData.get("firstname"),
          lastName: formData.get("lastname"),
          phone: formData.get("phone"),
          postalAddress: {
            postalAddressLine1: formData.get("postalAddressLine"),
            postalCode: formData.get("postalCode"),
            city: formData.get("city"),
          },
        },
      });

      if (res.status === 201) {
        return redirect(302, "/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
