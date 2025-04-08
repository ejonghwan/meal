import Header from "@/src/components/common/header";
import Main from "@/src/components/common/main";
import Footer from "@/src/components/common/footer";

export default function SignUpLayout({ children, }: { children: React.ReactNode; }) {

   return (
      <>
         <Header />
         여긴 사인업 레이아웃
         <Main>
            {children}
         </Main>
         <Footer />
      </>
   );
}
