// @ts-nocheck
export const labelLevel = (kodeWilayah) => {
    switch (kodeWilayah.length) {
        case 10:
            return "Desa/Kelurahan";
            break;
        case 7:
            return "Kecamatan";
            break;
        case 4:
            if(kodeWilayah.substring(2,3)=='7') return 'Kota';
            else return "Kabupaten";
            break;
        case 2:
            return "Provinsi";
            break;
        default:
            return "-";
            break;
    }
};

export const labelKepalaWilayah = (kodeWilayah) => {
    switch (kodeWilayah.length) {
        case 10:
            return "Kepala Desa/Kelurahan";
            break;
        case 7:
            return "Camat";
            break;
        case 4:
            if(kodeWilayah.substring(2,3)=='7') return 'Walikota';
            else return "Bupati";
            break;
        case 2:
            return "Gubernur";
            break;
        default:
            return "-";
            break;
    }
};