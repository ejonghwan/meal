import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = () => {

   // path 없이 오는 경우 /home으로 리디렉션
   const headersList = headers();
   const headerPathname = headersList.get('x-pathname') || "";
   if (!headerPathname) redirect('/home')
}

export default Page