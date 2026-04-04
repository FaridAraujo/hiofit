import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | HioFit",
  description: "Conocé cómo HioFit protege tu información personal y privacidad.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-24 pb-20">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-display-lg font-bold text-brand-dark mb-4">
            Política de Privacidad
          </h1>
          <p className="font-sans text-base text-brand-gray">
            Última actualización: 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-brand-dark prose-p:text-brand-gray prose-a:text-brand-red hover:prose-a:text-brand-red/80 prose-strong:text-brand-dark">
          <p>
            Agradecemos tu interés en nuestros servicios en Hiofit. En esta Política de Privacidad, explicaremos cómo
            recopilamos, utilizamos, protegemos y divulgamos la información personal que obtenemos de los usuarios de
            nuestro sitio web y servicios relacionados. Al utilizar nuestros servicios, aceptas las prácticas descritas
            en esta Política de Privacidad.
          </p>

          <h2>Recopilación de Información Personal</h2>
          <p>
            Cuando interactúas con nuestro sitio web, compras en nuestra tienda o utilizas nuestros servicios, es posible
            que te solicitemos proporcionar cierta información personal que nos permita identificarte. Esta información puede
            incluir, entre otros datos, tu nombre, dirección de correo electrónico, número de teléfono y cualquier otra
            información que elijas proporcionar voluntariamente.
          </p>

          <h2>Uso de la Información Recopilada</h2>
          <p>
            Utilizamos la información personal que recopilamos para proporcionarte nuestros servicios y mejorar tu experiencia
            como usuario. Esto incluye, entre otros, los siguientes propósitos:
          </p>
          <ul>
            <li>Brindar y gestionar los servicios que solicitas.</li>
            <li>Personalizar y adaptar nuestros servicios a tus necesidades y preferencias.</li>
            <li>Comunicarnos contigo y responder a tus consultas, preguntas y solicitudes.</li>
            <li>
              Enviar información relevante sobre nuestros servicios, como actualizaciones, cambios y promociones.
            </li>
            <li>
              Mejorar nuestros servicios, realizar análisis y estudios de mercado, y recopilar información estadística
              sobre el uso de nuestro sitio web.
            </li>
            <li>Detectar y prevenir fraudes, actividades ilegales y abusos en relación con nuestros servicios.</li>
            <li>
              Completar transacciones, verificar pagos, crear órdenes, concertar envíos y procesar devoluciones.
            </li>
          </ul>
          <p>
            También, con tu permiso, podremos enviarte correos electrónicos acerca de nuestra tienda, nuevos productos,
            servicios y otras actualizaciones.
          </p>

          <h2>Consentimiento</h2>
          <p>
            Cuando nos provees tu información personal para completar una transacción, verificar tu tarjeta de crédito,
            crear una orden, concertar un envío o hacer una devolución, implicamos que aceptas la recolección y uso por
            esa razón específica solamente. Si te pedimos tu información personal por una razón secundaria, como marketing,
            te pediremos directamente tu expreso consentimiento, o te daremos la oportunidad de negarte. Puedes anular tu
            consentimiento en cualquier momento contactándonos en <strong>info@hiofit.com</strong>.
          </p>

          <h2>Divulgación a Terceros</h2>
          <p>
            Podemos divulgar tu información personal si se nos requiere por ley o si violas nuestros Términos de Servicio.
            En general, los proveedores de terceros utilizados por nosotros solo recopilarán, usarán y divulgarán tu
            información en la medida que sea necesaria para que les permita desempeñar los servicios que nos proveen. Sin
            embargo, algunos proveedores de servicios de terceros, como pasarelas de pago y otros procesadores de
            transacciones de pago, tienen sus propias políticas de privacidad con respecto a la información que estamos
            obligados a proporcionarles para las transacciones relacionadas con las compras. Te recomendamos leer las
            políticas de privacidad de estos proveedores para entender cómo manejan tu información personal.
          </p>

          <h2>Seguridad</h2>
          <p>
            Para proteger tu información personal, tomamos precauciones razonables y seguimos las mejores prácticas de la
            industria para asegurarnos de que no haya pérdida de manera inapropiada, mal uso, acceso, divulgación,
            alteración o destrucción de esta.
          </p>
          <p>
            Si nos proporcionas la información de tu tarjeta de crédito, dicha información es encriptada mediante la
            tecnología Secure Socket Layer (SSL) y se almacena con un cifrado AES-256. Aunque ningún método de transmisión
            a través de Internet o de almacenamiento electrónico es 100% seguro, seguimos todos los requisitos de PCI-DSS
            e implementamos normas adicionales aceptadas por la industria.
          </p>

          <h2>Política de Cookies</h2>
          <p>
            Utilizamos cookies y tecnologías similares para recopilar información sobre tu actividad en nuestro sitio web.
            Esto nos permite mejorar nuestros servicios y brindarte una experiencia personalizada. Puedes ajustar la
            configuración de tu navegador para rechazar las cookies, pero esto puede limitar algunas funcionalidades de
            nuestro sitio.
          </p>

          <h2>Edad de Consentimiento</h2>
          <p>
            Al utilizar este sitio, declaras que tienes al menos la mayoría de edad en tu estado o provincia de residencia
            y que nos has dado tu consentimiento para permitir que cualquiera de tus dependientes menores use este sitio.
          </p>

          <h2>Cambios a esta Política de Privacidad</h2>
          <p>
            Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Te recomendamos
            revisarla periódicamente para estar informado sobre los cambios. Los cambios y aclaraciones entrarán en vigor
            inmediatamente después de su publicación en el sitio web.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tienes preguntas, inquietudes o deseas acceder, corregir, enmendar o borrar cualquier información personal
            que poseamos sobre ti, puedes contactarnos a través de <strong>info@hiofit.com</strong>.
          </p>

          <div className="mt-12 rounded-lg border border-brand-muted bg-brand-base p-6">
            <p className="font-sans text-sm text-brand-gray">
              <strong>HioFit</strong>
              <br />
              Alajuela, 20101, Costa Rica
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
