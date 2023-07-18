import axios from "axios";

const API_URL = `https://jiteraasignment-production.up.railway.app/api/auth/`;

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL, {
                email,
                password
            })
            .then(response => {
                if (response.data.user.token) {
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email: string, password: string) {
        return axios.post(API_URL + "register", {
            email,
            password
        });
    }

}

export default new AuthService();
