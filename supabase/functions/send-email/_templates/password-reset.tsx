import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Button,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface PasswordResetEmailProps {
  resetUrl: string
  userName: string
}

export const PasswordResetEmail = ({
  resetUrl,
  userName,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your Eloura password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Reset Your Password</Heading>
        <Text style={text}>
          Hi {userName},
        </Text>
        <Text style={text}>
          We received a request to reset your password for your Eloura account. Click the button below to create a new password:
        </Text>
        <Button
          href={resetUrl}
          style={{
            ...button,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Reset Password
        </Button>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Or, copy and paste this link into your browser:
        </Text>
        <Text style={code}>{resetUrl}</Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
        </Text>
        <Text style={text}>
          This password reset link will expire in 24 hours for security reasons.
        </Text>
        <Text style={text}>
          If you need help, contact us at support@elouraapp.com.
        </Text>
        <Text style={footer}>
          <Link
            href="https://elouraapp.com"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            Eloura
          </Link>
          , your family care companion.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default PasswordResetEmail

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const button = {
  backgroundColor: '#2754C5',
  borderRadius: '6px',
  color: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
  wordBreak: 'break-all' as const,
}