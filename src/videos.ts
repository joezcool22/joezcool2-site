// src/videos.ts
import source from '../joezcool2-video-links.json';
import type {Video} from './model';
export const videoCatalog:Video[]=source.videos.map(v=>({id:v.video_id,title:v.title||'',description:v.description||'',placements:v.placements.map(p=>({...p,type:p.type as 'video'|'short'|'livestream'}))}));
export const videoUrl=(id:string,short=false)=>short?`https://www.youtube.com/shorts/${id}`:`https://www.youtube.com/watch?v=${id}`;
export const thumbnail=(id:string)=>`https://img.youtube.com/vi/${id}/hqdefault.jpg`;
export function validateVideos(value:unknown):value is Video[]{return Array.isArray(value)&&new Set(value.map(v=>v?.id)).size===value.length&&value.every(v=>v&&typeof v.id==='string'&&/^[\w-]{11}$/.test(v.id)&&typeof v.title==='string'&&typeof v.description==='string'&&Array.isArray(v.placements)&&v.placements.length>0&&v.placements.every((p:any)=>p&&typeof p.category==='string'&&p.category.length>0&&['video','short','livestream'].includes(p.type)&&(p.source_id===undefined||typeof p.source_id==='string')&&(p.source_key===undefined||typeof p.source_key==='string')&&(p.featured===undefined||typeof p.featured==='boolean')));}




