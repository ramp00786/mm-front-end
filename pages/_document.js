import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
      <script src="https://code.jquery.com/jquery-3.4.1.min.js" defer  ></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" defer  ></script>
      <script src="https://tropmet.res.in/monsoon/monsoon3/js/lib/easing/easing.min.js" defer  ></script>
      <script src="https://tropmet.res.in/monsoon/monsoon3/js/lib/waypoints/waypoints.min.js" defer  ></script>
      <script src="https://tropmet.res.in/monsoon/monsoon3/js/lib/owlcarousel/owl.carousel.min.js" defer  ></script>
      <script src="https://tropmet.res.in/monsoon/monsoon3/js/main.js" defer  ></script>
      <script src="/custom.js" defer></script>
      {/* <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"  /> */}
      {/* <link  rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> */}
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
