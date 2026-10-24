// src/published.ts
import snapshot from './published-site.json';
import {validate} from './model';
export const sharedContent=validate(snapshot.content);
export const sharedImages:Record<string,string>=snapshot.images;
export const hosted=!['localhost','127.0.0.1','[::1]'].includes(location.hostname);
