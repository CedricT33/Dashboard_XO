package fr.tressous.cedric.dashboard.appli.dto;

/**
 * Specific DTO (Data Transfer Object) to return JWT as a JSON object through REST response.
 */
public class JsonWebToken {
    private final String token;

    public JsonWebToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
