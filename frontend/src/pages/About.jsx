import Navigation from "../components/Navigation";
import constructionImage from "../assets/crow-construction.webp";

export default function About() {
  return (
    <>
      <Navigation />

      <main className="about">
        <img
          className="about-image"
          src={constructionImage}
          alt="Crow carrying an 'under construction' sign"
        />
        <h2>This page is still under construction</h2>
        <p>Our ravens are working on it. Check back soon.</p>
      </main>
    </>
  );
}
