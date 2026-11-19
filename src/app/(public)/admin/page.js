import Image from "next/image";
import { Suspense } from "react";
import AdminLogin from "./AdminLogin";
import coverImg from "../../../../public/backgroundImg/it.png";
import "./adminPage.css";

export default async function Page() {
  return (
    <main className="adm-page">
      {/* Image section (70%) */}
      <section className="adm-cover">
        {/* Blurred background fill (hides empty space) */}
        <Image
          src={coverImg}
          alt=""
          fill
          priority
          sizes="70vw"
          aria-hidden="true"
          className="adm-cover-bg"
        />
        <Image
          src={coverImg}
          alt="IT Division Work Management Portal"
          fill
          priority
          sizes="(max-width: 992px) 0px, 70vw"
          className="adm-cover-img"
        />
      </section>

      {/* Login section (30%) */}
      <section className="adm-login-section">
        <div className="adm-login-card">
          <Image
            src="/LogoImage/ChatGPT%20Image%20May%2012%2C%202026%2C%2005_06_07%20PM.png"
            alt="Govt Logo"
            height={100}
            width={90}
            unoptimized
            className="adm-logo"
          />

          <h2 className="adm-title">PWD IT Admin Portal</h2>
          <p className="adm-subtitle">Sign in to continue</p>
          <div className="adm-divider" />

          <Suspense fallback={null}>
            <AdminLogin />
          </Suspense>

          <p className="adm-footer">
            © PWD IT Division · Authorized access only
          </p>
        </div>
      </section>
    </main>
  );
}
