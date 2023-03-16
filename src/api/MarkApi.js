import { AxiosClient } from "./AxiosClitent";

const MarkApi = {
    getMark(id){
        const url =`/marks/${id} `;
        return AxiosClient.get(url)
    },
    addMark(data){
        const url =`/marks/create`;
        return AxiosClient.post(url,data)
    },
    editMark(id,data){
        const url =`/marks/${id} `;
        return AxiosClient.put(url,data)
    },

}
export default MarkApi