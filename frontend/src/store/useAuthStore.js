import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'

const BASE_URL = "http://localhost:6609/";

export const useAuthStore = create((set , get )=>({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,
    onlineUsers : [],
    socket : null,

    checkAuth : async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser : res.data });

            get().connectSocket(); 

        } catch (error) {
            console.log({ message : `Error Checking Auth :: ${error}` });
            set({ authUser : null });
        }
        finally{
            set({ isCheckingAuth : false })
        }
    },

    signup : async (data) => {
        set({ isSigningUp : true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser : res.data });
            toast.success("Account created successfuly!");

            get().connectSocket();
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(`ERROR :: FRONTEND SIGNUP :: ${error}`);
        }
        finally{
            set({ isSigningUp : false });
        }
    },

    logout : async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser : null })
            toast.success("Logged out successfully!")

            get().disconnectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login : async (data) => {
        set({ isLoggingIn : true });
        try {
            let res = await axiosInstance.post("/auth/login", data);
            set({ authUser : res.data })
            toast.success("Login successfuly!");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message); 
        }
        finally{
            set({ isLoggingIn : false })
        }
    },

    updateProfileImage : async (data) => {
        set({ isUpdatingProfile : true })
        console.log("Update profile image data :",data);
        
        try {
            const resp = await axiosInstance.put("/auth/update-profile", data); 
            console.log("Profile data",data);
            
            set({ authUser : resp.data });
            toast.success("Profile updated successfuly");
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({ isUpdatingProfile : false });
        }
    },

    connectSocket : async () => {
        const { authUser } = get()
        if(!authUser || get().socket?.connected ) return;

        const socket = io(BASE_URL,{
            query : {
                userId : authUser._id,
            }
        })
        socket.connect();

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers : userIds })
        })

        set({ socket : socket });
        console.log("User",get().socket?.connected );
        
    },

    disconnectSocket : async () => {
        if(get().socket?.connected) get().socket.disconnect();
    }
}))