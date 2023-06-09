import axios from "axios";

const API_URL = `jiteraasignment-production.up.railway.app/api/`;

class DepositService {
    deposit(email: string, totalDeposit: number) {
        return axios.post(API_URL + "deposit", {
            email,
            totalDeposit
        });
    }

    createItem(name: string, startPrice: number, timeWindow: number) {
        return axios.post(API_URL + "createItem", {
            name, startPrice, timeWindow
        });
    }

}

export default new DepositService();
