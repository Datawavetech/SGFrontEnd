import { DownloadLogParams } from "@/pages/dataOnChain/onChainRequests/data";
import request from '@/utils/request';
import { stringify } from "qs";

export async function downloadLog(params: DownloadLogParams) {
    return request(`/api/audit/export?${stringify(params)}`);
}