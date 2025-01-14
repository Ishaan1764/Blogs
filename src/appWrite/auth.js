import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ name, email, password }) {
        try {
            // First parameter always a unique ID
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Account creation succeeded, now login
                const session = await this.login({ email, password });
                return session; // Return session if login is successful
            }
        } catch (error) {
            console.log("Error in Create Account", error);
            throw new Error("Account creation failed");
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            if (session) {
                // Save session to localStorage for persistence
                // localStorage.setItem("session", JSON.stringify(session));
                return session;
            }
        } catch (error) {
            console.log("Error in Login", error);
            throw new Error("Login failed");
        }
    }

    async CheckUser() {
        try {
            const user = await this.account.get();
            if (user) {
                return user; // has the userID
            } else {
                console.log("User Not Found while Checking!");
            }
        } catch (error) {
            console.log("Check User Error", error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions(); // Fix: Call deleteSessions method
            // localStorage.removeItem("session"); // Clear session from localStorage
            return true; // Return true to indicate successful logout
        } catch (error) {
            console.log("Error in LogOut", error);
            return false; // Return false if logout failed
        }
    }
};

// Exporting instance for easy use across the app
const authService = new AuthService();
export default authService;