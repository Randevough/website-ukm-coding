import { describe, it, expect } from "vitest";
import { resolveLink, resolveLinkAttributes } from "../linkResolver";

describe("linkResolver - Security & Protocol Sanitization", () => {
  describe("resolveLink()", () => {
    it("should fallback to '#' for empty, undefined, or null values", () => {
      expect(resolveLink("")).toEqual({
        href: "#",
        isExternal: false,
        isMailOrTel: false,
      });
      expect(resolveLink(null)).toEqual({
        href: "#",
        isExternal: false,
        isMailOrTel: false,
      });
      expect(resolveLink(undefined)).toEqual({
        href: "#",
        isExternal: false,
        isMailOrTel: false,
      });
      expect(resolveLink("   ")).toEqual({
        href: "#",
        isExternal: false,
        isMailOrTel: false,
      });
      expect(resolveLink("#")).toEqual({
        href: "#",
        isExternal: false,
        isMailOrTel: false,
      });
    });

    it("should neutralize dangerous protocols to prevent XSS", () => {
      expect(resolveLink("javascript:alert('XSS')").href).toBe("#");
      expect(resolveLink("JAVASCRIPT:alert(1)").href).toBe("#");
      expect(
        resolveLink(
          "data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==",
        ).href,
      ).toBe("#");
      expect(resolveLink("vbscript:MsgBox(1)").href).toBe("#");
      expect(resolveLink("file:///etc/passwd").href).toBe("#");
    });

    it("should correctly handle mailto: and tel: protocols", () => {
      const emailResult = resolveLink("mailto:contact@cyber-univ.ac.id");
      expect(emailResult).toEqual({
        href: "mailto:contact@cyber-univ.ac.id",
        isExternal: false,
        isMailOrTel: true,
      });

      const telResult = resolveLink("tel:+628123456789");
      expect(telResult).toEqual({
        href: "tel:+628123456789",
        isExternal: false,
        isMailOrTel: true,
      });
    });

    it("should auto-prefix bare email addresses with mailto:", () => {
      const result = resolveLink("ukmcoding@cyber-univ.ac.id");
      expect(result).toEqual({
        href: "mailto:ukmcoding@cyber-univ.ac.id",
        isExternal: false,
        isMailOrTel: true,
      });
    });

    it("should preserve internal relative paths and anchors", () => {
      expect(resolveLink("/projects").isExternal).toBe(false);
      expect(resolveLink("/projects").href).toBe("/projects");

      expect(resolveLink("/updates/kegiatan-coding").isExternal).toBe(false);
      expect(resolveLink("/updates/kegiatan-coding").href).toBe(
        "/updates/kegiatan-coding",
      );

      expect(resolveLink("#section").href).toBe("#section");
    });

    it("should handle fully qualified http and https URLs", () => {
      const res = resolveLink("https://instagram.com/coding.cyberuniversity");
      expect(res).toEqual({
        href: "https://instagram.com/coding.cyberuniversity",
        isExternal: true,
        isMailOrTel: false,
      });

      const httpRes = resolveLink("http://example.com/doc");
      expect(httpRes).toEqual({
        href: "http://example.com/doc",
        isExternal: true,
        isMailOrTel: false,
      });
    });

    it("should auto-prefix bare domain URLs with https://", () => {
      const res = resolveLink("instagram.com/coding.cyberuniversity");
      expect(res).toEqual({
        href: "https://instagram.com/coding.cyberuniversity",
        isExternal: true,
        isMailOrTel: false,
      });

      const wwwRes = resolveLink("www.cyber-univ.ac.id");
      expect(wwwRes).toEqual({
        href: "https://www.cyber-univ.ac.id",
        isExternal: true,
        isMailOrTel: false,
      });
    });
  });

  describe("resolveLinkAttributes()", () => {
    it("should extract href from node.markDef.href (Sanity format)", () => {
      const node = {
        markDef: {
          _type: "link",
          href: "https://instagram.com/coding.cyberuniversity",
        },
      };
      const attrs = resolveLinkAttributes(node);
      expect(attrs.href).toBe("https://instagram.com/coding.cyberuniversity");
      expect(attrs.target).toBe("_blank");
      expect(attrs.rel).toBe("noopener noreferrer");
    });

    it("should extract href from fallback node.markDef.url or node.href", () => {
      const nodeUrl = {
        markDef: {
          url: "https://cyber-univ.ac.id",
        },
      };
      expect(resolveLinkAttributes(nodeUrl).href).toBe(
        "https://cyber-univ.ac.id",
      );

      const nodeDirect = {
        href: "https://cyber-univ.ac.id",
      };
      expect(resolveLinkAttributes(nodeDirect).href).toBe(
        "https://cyber-univ.ac.id",
      );
    });

    it("should not open mailto or tel links in target='_blank'", () => {
      const emailNode = {
        markDef: {
          href: "ukmcoding@cyber-univ.ac.id",
          blank: true, // even if blank is true, mailto should not spawn empty tabs
        },
      };
      const attrs = resolveLinkAttributes(emailNode);
      expect(attrs.href).toBe("mailto:ukmcoding@cyber-univ.ac.id");
      expect(attrs.target).toBeUndefined();
      expect(attrs.rel).toBeUndefined();
    });

    it("should not assign target or rel for internal links by default", () => {
      const internalNode = {
        markDef: {
          href: "/projects",
        },
      };
      const attrs = resolveLinkAttributes(internalNode);
      expect(attrs.href).toBe("/projects");
      expect(attrs.target).toBeUndefined();
      expect(attrs.rel).toBeUndefined();
    });

    it("should enforce rel='noopener noreferrer' whenever target='_blank'", () => {
      const explicitBlankInternal = {
        markDef: {
          href: "/panduan.pdf",
          blank: true,
        },
      };
      const attrs = resolveLinkAttributes(explicitBlankInternal);
      expect(attrs.href).toBe("/panduan.pdf");
      expect(attrs.target).toBe("_blank");
      expect(attrs.rel).toBe("noopener noreferrer");
    });
  });
});
