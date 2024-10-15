import { ContentContainer } from '@/app/_components/ui/layout/ContentContainer';

const PrivacyPage = () => {
  return (
    <>
      <ContentContainer>
        <h1>Privacy Policy</h1>
        <h2>Your data</h2>
        <ul>
          <li>
            We prioritize your privacy and strictly limit our data collection.
          </li>
          <li>
            We avoid using cookies except when essential and never collect
            personal data unless voluntarily provided by you.
          </li>
          <li>Your data is yours, not ours, and we pledge never to sell it.</li>
          <li>
            We take the protection of your data very seriously. Our data
            protection mechanisms include industry-standard access controls and
            regular security assessments.
            <ul>
              <li>
                We implement multi-layered security protocols to prevent
                unauthorized access and ensure the confidentiality, integrity,
                and availability of your data.
              </li>
              <li>
                Our systems are continuously monitored and updated to protect
                against emerging threats.
              </li>
              <li>
                We adhere to best practices and regulatory requirements to
                maintain data security.
              </li>
            </ul>
          </li>
          <li>
            Your trust and the safety of your information are our top
            priorities.
          </li>
        </ul>
        <p>
          In this policy, we explain our data collection and handling practices,
          and your rights pertaining to your data.
        </p>
        <h2>As a visitor to the funnelmink.com website</h2>
        <p>
          Visitors to our website can browse freely, with minimal data
          collection or tracking:
        </p>
        <ul>
          <li>
            We don't collect personal information unless you become a
            "subscriber" and voluntarily provide it.
          </li>
          <li>
            Basic cookies are used to ensure a good browsing experience (e.g.,
            keeping you logged in to the app) but not for tracking or
            advertising purposes.
          </li>
          <li>
            We do not share or sell any information to third-party services.
          </li>
          <li>
            We use Sentry, an open-source bug-tracking service, which uses
            third-party cookies in a privacy-friendly manner. We might use other
            privacy-compliant services, for example, Plausible.io or the
            built-in option in Framer to get statistics on website visits. We’re
            a young company and iterate with different tools, and we try to come
            back to this page and keep the list up-to-date. If you ever notice
            it’s not, please let us know, and we will quickly update it.
          </li>
          <li>
            We collect anonymous data for statistical purposes, which helps us
            to understand trends in website traffic. Personal data is not part
            of this collection.
          </li>
        </ul>
        <h2>As a subscriber or user of Funnelmink</h2>
        <p>
          As a subscriber, your name, your email, or your phone number will be
          collected to send you updates and communications, subject to your
          approval.
        </p>
        <p>As a user, we collect the necessary data to provide our services:</p>
        <ul>
          <li>
            Required details include your full name, an email address, and,
            possibly, billing information.
          </li>
          <li>
            Data is shared with select third-party services, such as Google
            Cloud Storage for hosting, and Sentry for bug tracking, who are not
            permitted to use the data for their purposes.
          </li>
          <li>
            We are committed to high-level security measures and will work
            towards getting certification for these in the future.
          </li>
          <li>
            Users can access, change, or delete their personal data by reaching
            out to us directly.
          </li>
        </ul>
        <h2>Retention of data</h2>
        <p>
          We retain your data for as long as your account is active or as
          necessary for providing you with the services. This data is also used
          to comply with our legal obligations, resolve disputes, enforce our
          agreements, and protect Funnelmink's legal rights. We plan to
          implement a system to automate data cleanup. Since the company is
          rather young, it would have nothing to delete if we built it now. But
          it’s definitely something we want to prioritize in the future.
        </p>
        <h2>GDPR, CCPA, PECR, PSI and HIPAA</h2>
        <p>
          We are committed to respecting and upholding the standards set forth
          by the General Data Protection Regulation (GDPR), California Consumer
          Privacy Act (CCPA), and Privacy and Electronic Communications
          Regulations (PECR). Funnelmink is not certified by the Payment Card
          Industry (PCI) or Health Insurance Portability and Accountability Act
          (HIPAA) standards. As such, we do not claim to comply with PCI and
          HIPAA requirements for the protection of financial and medical data.
        </p>
        <h2>Changes and questions</h2>
        <p>
          Our privacy policy may be updated as our business evolves and to stay
          compliant with regulations. Significant changes will be communicated
          to users via email. Please reach us at info@funnelmink.com for any
          queries, comments, or concerns about this privacy policy, your data,
          or your rights related to your information.
        </p>
      </ContentContainer>
    </>
  );
};

export default PrivacyPage;
