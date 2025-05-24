import axios from 'axios';
const url = process.env.NEXT_PUBLIC_BASE_URL;
export async function fetchMfs(query: string) {
    try {
        const res = await axios.get(`${url}/overlap/searchmf`, {
            params: { mf: query }
        });
        // console.log("Mutual funds:", res.data);
        return res.data; // assuming that the data you need is in the `data` field
    } catch (error) {
        console.error("Error fetching mutual funds:", error);
        return []; // returning an empty array in case of error
    }
};

type Scheme = {
    id: string;
    name: string;
};
export async function fetchOverlapData(schemeA: Scheme, schemeB: Scheme) {
    try{
        const res = await axios.get(`${url}/overlap/${schemeA.id}/${schemeB.id}`);
        return res.data; // assuming that the data you need is in the `data` field
        
    }catch(err){
        return err; // returning an empty object in case of error
    }
}

export async function fetchStocks(){
    try {
        const res = await axios.get(`${url}/stock/`);
        // console.log("Mutual funds:", res.data);
        return res.data; // assuming that the data you need is in the `data` field
    } catch (error) {
        console.error("Error fetching stocks:", error);
        return []; // returning an empty array in case of error
    }
}

export async function fetchMfsById(id:string){
    try {
        const res = await axios.get(`${url}/stock/${id}/mf`)
        // console.log("Mutual funds:", res.data);
        return res.data; // assuming that the data you need is in the `data` field
    } catch (error) {
        console.error("Error fetching mutual funds:", error);
        return []; // returning an empty array in case of error
    }
}


export async function fetchFunds() {
    try {
        const res = await axios.get(`${url}/mf/`);
        // console.log("Mutual funds:", res.data);
        return res.data; // assuming that the data you need is in the `data` field
    } catch (error) {
        console.error("Error fetching stocks:", error);
        return []; // returning an empty array in case of error
    }
}

export async function fetchStksById(id:string){
    try {
        const res = await axios.get(`${url}/mf/${id}/stocks`)
        // console.log("Stocks:", res.data);
        return res.data; // assuming that the data you need is in the `data` field
    } catch (error) {
        console.error("Error fetching mutual funds:", error);
        return []; // returning an empty array in case of error
    }
}


export async function fetchIndices() {
    try {
        const res = await axios.get(`${url}/index/`);
        // console.log("Index:", res);
        return res.data; // assuming that the data you need is in the `data` field
    } catch (error) {
        console.error("Error fetching stocks:", error);
        return []; // returning an empty array in case of error
    }
}

export async function fetchStksByIdx(id:string) {
    try {
        const res = await axios.get(`${url}/indexstock/${id}`);
        console.log("Stocks:", res);
        return res.data; // assuming that the data you need is in the `data` field
    } catch (error) {
        console.error("Error fetching stocks:", error);
        return []; // returning an empty array in case of error
    }
}