export class CookieService {
  cookies() {
    const cookies = document.cookie.split("; ");
    return cookies;
  }

  getValue(name) {
    for (let cookie of this.cookies()) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
}
