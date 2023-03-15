// @ts-nocheck
import { isShowMap, dataMap } from "../stores/generalStores";

export const setMapData = (variabelId, kodeProv, kodeKab, kodeKec, kodeDesa, nilai) => {
    if(nilai==0){
        alert("Tidak ada data infrastruktur pada kategori ini");
    }
    else{
        isShowMap.set(true)
        dataMap.set({
            variabel_id: variabelId,
            kode_prov: kodeProv,
            kode_kab: kodeKab,
            kode_kec: kodeKec,
            kode_desa: kodeDesa
        });
    }
}