import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ReauthenticationEmailProps {
  userName: string
  verificationCode: string
  actionDescription: string
}

export const ReauthenticationEmail = ({
  userName,
  verificationCode,
  actionDescription,
}: ReauthenticationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Eloura Verification Code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Verification Required</Heading>
        
        <Text style={text}>
          Hi {userName},
        </Text>
        
        <Text style={text}>
          For your security, we need to verify your identity before proceeding with: <strong>{actionDescription}</strong>
        </Text>
        
        <Section style={codeSection}>
          <Text style={codeLabel}>Your verification code:</Text>
          <Text style={code}>{verificationCode}</Text>
        </Section>
        
        <Text style={text}>
          Please enter this code in the app to continue. This code will expire in 10 minutes for your security.
        </Text>
        
        <Hr style={hr} />
        
        <Text style={footer}>
          If you didn't request this verification, please ignore this email and contact our support team if you have concerns.
        </Text>
        
        <Text style={footer}>
          This verification code was sent by Eloura Family Organization Platform.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

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

const codeSection = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  margin: '24px 0',
  padding: '20px',
  textAlign: 'center' as const,
}

const codeLabel = {
  color: '#495057',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px',
}

const code = {
  color: '#059669',
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '4px',
  margin: '0',
  fontFamily: 'Monaco, Menlo, "Courier New", monospace',
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