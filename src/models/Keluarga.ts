
export interface Keluarga {
    id: number,
	kode_prov: string,
	kode_kab: string,
	kode_kec: string,
	kode_desa: string,
	no_kk: string,
	nama_kepala: string,
    jumlah_art: number,
    status_kesejahteraan: number,
	periode_awal_miskin: string,
	periode_akhir_miskin: string,
	latitude: string,
	longitude: string,
	nama_sls: string,
	alamat: string,
	status_aktif: number,
	encId: string,
    bantuan: Bantuan[]
}

export interface Bantuan{
    id: number,
	kode_prov: string,
	kode_kab: string,
	kode_kec: string,
	kode_desa: string,
	no_kk: string,
	nik: string,
	nama_kepala: string,
    bantuan_id: number,
    waktu_bantuan: string,
	jumlah_bantuan: string,
	satuan_bantuan: string,
	encId: string
}