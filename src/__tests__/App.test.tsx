import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// Stub scrollIntoView which jsdom doesn't implement
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn()
  vi.restoreAllMocks()
})

describe('App', () => {
  it('renders the hero heading', () => {
    render(<App />)
    expect(screen.getByText('Rosiana da Silva')).toBeInTheDocument()
    expect(screen.getByText('Bertolazi')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<App />)
    expect(
      screen.getByText('Executiva de Tecnologia | Autora | Palestrante | Empreendedora'),
    ).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<App />)
    const labels = ['Início', 'Sobre', 'Expertise', 'Carreira', 'Publicações', 'Certificações', 'Contato']
    for (const label of labels) {
      // Each label appears twice: desktop nav + mobile nav (when open), or once
      const elements = screen.getAllByText(label)
      expect(elements.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('renders expertise cards', () => {
    render(<App />)
    expect(screen.getByText('Inteligência Artificial')).toBeInTheDocument()
    expect(screen.getByText('Engenharia de Software')).toBeInTheDocument()
    expect(screen.getByText('Transformação Digital')).toBeInTheDocument()
  })

  it('renders career entries', () => {
    render(<App />)
    expect(screen.getByText('F1RST Digital Services')).toBeInTheDocument()
    expect(screen.getByText('RD Saúde (Raia Drogasil)')).toBeInTheDocument()
  })

  it('renders certifications', () => {
    render(<App />)
    expect(screen.getByText('COBIT 5 Foundation')).toBeInTheDocument()
    expect(screen.getByText('ITIL v3 Foundation')).toBeInTheDocument()
  })

  it('renders education entries', () => {
    render(<App />)
    expect(screen.getByText(/MBA em Gestão de Negócios/)).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Seu nome completo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('(DD) XXXXX-XXXX')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Escreva sua mensagem aqui...')).toBeInTheDocument()
  })
})

describe('App — phone input formatting', () => {
  it('formats phone number as user types', async () => {
    const user = userEvent.setup()
    render(<App />)
    const phoneInput = screen.getByPlaceholderText('(DD) XXXXX-XXXX')
    await user.click(phoneInput)
    await user.type(phoneInput, '11999991234')
    expect(phoneInput).toHaveValue('(11) 99999-1234')
  })
})

describe('App — mobile menu toggle', () => {
  it('opens mobile menu on click', () => {
    // Set viewport narrow enough
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true })

    render(<App />)
    // The mobile menu button has Menu / X icon. Find any button with the Menu icon.
    // The mobile menu button is an md:hidden button. We'll look for the button
    // by finding one that doesn't have 'hidden' in its className (at mobile viewport).
    // Actually, let's find the menu toggle by its svg content.
    const buttons = screen.getAllByRole('button')
    // The last button in the nav area should be the mobile menu toggle
    const menuButton = buttons.find((btn) => btn.className.includes('md:hidden'))
    expect(menuButton).toBeTruthy()

    // Before clicking, mobile nav items shouldn't be in a visible mobile panel
    fireEvent.click(menuButton!)
    // After clicking, the mobile menu should show nav items
    // In mobile menu, items are rendered inside a div with md:hidden
    const allContato = screen.getAllByText('Contato')
    expect(allContato.length).toBeGreaterThanOrEqual(2) // desktop + mobile
  })
})

describe('App — contact form submission', () => {
  it('shows success message on successful form submission', async () => {
    const user = userEvent.setup()
    // Mock fetch to return success
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    } as Response)

    render(<App />)

    const nameInput = screen.getByPlaceholderText('Seu nome completo')
    const phoneInput = screen.getByPlaceholderText('(DD) XXXXX-XXXX')
    const messageInput = screen.getByPlaceholderText('Escreva sua mensagem aqui...')

    await user.type(nameInput, 'Test User')
    await user.type(phoneInput, '11999991234')
    await user.type(messageInput, 'Hello!')

    const submitButton = screen.getByRole('button', { name: /enviar/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Seu contato foi enviado com sucesso.')).toBeInTheDocument()
    })
  })

  it('shows alert on failed form submission', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ success: false }),
    } as Response)
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<App />)

    const nameInput = screen.getByPlaceholderText('Seu nome completo')
    const phoneInput = screen.getByPlaceholderText('(DD) XXXXX-XXXX')
    const messageInput = screen.getByPlaceholderText('Escreva sua mensagem aqui...')

    await user.type(nameInput, 'Test User')
    await user.type(phoneInput, '11999991234')
    await user.type(messageInput, 'Hello!')

    const submitButton = screen.getByRole('button', { name: /enviar/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Erro ao enviar mensagem. Por favor, tente novamente.')
    })
  })

  it('shows alert on network error', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<App />)

    const nameInput = screen.getByPlaceholderText('Seu nome completo')
    const phoneInput = screen.getByPlaceholderText('(DD) XXXXX-XXXX')
    const messageInput = screen.getByPlaceholderText('Escreva sua mensagem aqui...')

    await user.type(nameInput, 'Test User')
    await user.type(phoneInput, '11999991234')
    await user.type(messageInput, 'Hello!')

    const submitButton = screen.getByRole('button', { name: /enviar/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Erro ao enviar mensagem. Por favor, tente novamente.')
    })
  })
})
