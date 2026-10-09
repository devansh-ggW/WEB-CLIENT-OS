import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { SiteChrome } from "@/components/SiteChrome";

export default function Support() {
  return (
    <SiteChrome>
      <div className="page-grid support-page">
        <div className="support-intro">
          <Link href="/" className="back-link">← Back to the field guide</Link>
          <p className="eyebrow">Need a hand?</p>
          <h1>Support, without the runaround.</h1>
          <p className="support-lede">Questions about the guide, access, or what happens next? Use the channel that works best on your device.</p>
          <div className="support-rule" aria-hidden="true" />
          <p className="support-small">These actions open your device’s email, phone, or WhatsApp app. No message is sent automatically.</p>
        </div>
        <div className="support-actions" aria-label="Support contact actions">
          <a className="support-action primary" href="mailto:dewifystores@gmail.com">
            <span className="support-action-icon"><Mail size={21} aria-hidden="true" /></span>
            <span className="support-action-copy"><strong>Email Support</strong><span>dewifystores@gmail.com</span></span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="support-action" href="tel:+917057241449">
            <span className="support-action-icon"><Phone size={21} aria-hidden="true" /></span>
            <span className="support-action-copy"><strong>Call Support</strong><span>+91 7057241449</span></span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="support-action whatsapp" href="https://wa.me/917057241449" target="_blank" rel="noreferrer">
            <span className="support-action-icon"><MessageCircle size={21} aria-hidden="true" /></span>
            <span className="support-action-copy"><strong>WhatsApp</strong><span>Open a conversation</span></span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </SiteChrome>
  );
}
