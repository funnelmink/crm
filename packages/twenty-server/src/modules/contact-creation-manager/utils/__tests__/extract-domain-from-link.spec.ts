import { extractDomainFromLink } from 'src/modules/contact-creation-manager/utils/extract-domain-from-link.util';

describe('extractDomainFromLink', () => {
  it('should extract domain from link', () => {
    const link = 'https://www.funnelmink.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('funnelmink.com');
  });

  it('should extract domain from link without www', () => {
    const link = 'https://funnelmink.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('funnelmink.com');
  });

  it('should extract domain from link without protocol', () => {
    const link = 'funnelmink.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('funnelmink.com');
  });

  it('should extract domain from link with path', () => {
    const link = 'https://funnelmink.com/about';
    const result = extractDomainFromLink(link);

    expect(result).toBe('funnelmink.com');
  });
});
