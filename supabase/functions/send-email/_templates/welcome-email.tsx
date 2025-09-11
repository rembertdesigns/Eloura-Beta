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

interface WelcomeEmailProps {
  userName: string
  loginUrl: string
}

export const WelcomeEmail = ({
  userName,
  loginUrl,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Eloura - Your Family Care Companion</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Eloura! 👋</Heading>
        <Text style={text}>
          Hi {userName},
        </Text>
        <Text style={text}>
          Welcome to Eloura, your comprehensive family care management platform! We're excited to help you organize, plan, and thrive in your family life.
        </Text>
        <Text style={text}>
          Here's what you can do with Eloura:
        </Text>
        <Text style={text}>
          • Organize your family schedule and tasks<br/>
          • Connect with your support village<br/>
          • Access helpful resources and tools<br/>
          • Plan and track family goals<br/>
          • Get personalized insights and support
        </Text>
        <Button
          href={loginUrl}
          style={{
            ...button,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Get Started with Eloura
        </Button>
        <Text style={text}>
          If you have any questions or need support, don't hesitate to reach out to us at support@elouraapp.com.
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
          <br/>
          <Link
            href="https://elouraapp.com/unsubscribe"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            Unsubscribe
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

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
    "-apple-system, BlinkMacSystemFont, 'Segue UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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