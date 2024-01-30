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
                </div>
            </section>
            <Footer/>
            </main>
        </div>
    )
}