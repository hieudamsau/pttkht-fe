import { AxiosClient } from "./AxiosClitent";

const StudentApi = {
    getAll(){
        const url =`/users/all-paging-student `;
        return AxiosClient.get(url)
    },
    login(data){
        const url =`/users/login `;
        return AxiosClient.post(url,data)
    },
    getAllTeacher(){
        const url =`/users/all-paging-teacher `;
        return AxiosClient.get(url)
    },
    getById(id){
        const url =`/users/${id} `;
        return AxiosClient.get(url)
    },
    addUser(data){
        const url =`/users/create`;
        return AxiosClient.post(url,data)
    },
    editUser(id,data){
        const url =`/users/${id} `;
        return AxiosClient.put(url,data)
    },
    changePassword(data){
        const url = `users/change-password`;
        return AxiosClient.post(url,data)
    }
}
export default StudentApi