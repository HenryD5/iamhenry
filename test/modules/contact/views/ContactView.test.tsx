import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ContactView } from "@/modules/contact/views/ContactView";

vi.mock("@/modules/contact/components/ContactAppHeader", () => ({
  ["ContactAppHeader"]: () => <header />,
}));

vi.mock("@/modules/contact/components/ContactForm", () => ({
  ["ContactForm"]: () => <form aria-label="contact" />,
}));

vi.mock("@/shared/seo/metadata", () => ({
  createPageMetadata: vi.fn(),
}));

describe("ContactView", () => {
  it("includes the no-JavaScript notice", () => {
    const { container } = render(<ContactView />);

    expect(container.querySelector("noscript")).toBeInTheDocument();
  });
});
