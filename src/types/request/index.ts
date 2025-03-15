export interface ExtendsRequestInit extends RequestInit {
   next?: {
      tags: string[];
   };
   cache?: RequestCache;
}
