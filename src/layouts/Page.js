import { ToastContainer } from "react-toastify";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import { Outlet } from "react-router-dom";

export default function Page() {
    return (
        <div>
            <main>
            <Header />
            <section className="pt-5">
                <div className='container-fluid'>  
                    <Outlet />
                    <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={false} theme="light"></ToastContainer>
                </div>
            </section>
            </main>
            <Footer/>
        </div>
    )
}