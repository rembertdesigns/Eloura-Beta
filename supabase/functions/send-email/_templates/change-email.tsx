import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ChangeEmailProps {
  userName: string
  newEmail: string
  confirmUrl: string
}

export const ChangeEmailEmail = ({
  userName,
  newEmail,
  confirmUrl,
}: ChangeEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your new email address for Eloura</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirm Your New Email Address</Heading>
        
        <Text style={text}>
          Hi {userName},
        </Text>
        
        <Text style={text}>
          You've requested to change your email address to <strong>{newEmail}</strong>. 
          To complete this change, please click the button below to confirm your new email address.
        </Text>
        
        <Section style={buttonSection}>
          <Link href={confirmUrl} style={button}>
            Confirm New Email Address
          </Link>
        </Section>
        
        <Text style={text}>
          Or copy and paste this link into your browser:
        </Text>
        
        <Text style={linkText}>
          {confirmUrl}
        </Text>
        
        <Hr style={hr} />
        
        <Text style={footer}>
          If you didn't request this email change, please ignore this message and contact our support team immediately.
        </Text>
        
        <Text style={footer}>
          This email was sent by Eloura Family Organization Platform.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ChangeEmailEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eaeaea',
  borderRadius: '12px',
  margin: '40px auto',
  padding: '20px',
  width: '465px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '28px',
  margin: '0 0 20px',
  textAlign: 'center' as const,
}

const text = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const buttonSection = {
  margin: '32px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#059669',
  border: 'none',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  padding: '12px 24px',
  textAlign: 'center' as const,
  textDecoration: 'none',
}

const linkText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '12px 0',
  wordBreak: 'break-all' as const,
}

const hr = {
  border: 'none',
  borderTop: '1px solid #eaeaea',
  margin: '20px 0',
}

const footer = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '12px 0 0',
}