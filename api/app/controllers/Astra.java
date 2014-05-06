package controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import play.*;
import play.mvc.*;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import play.libs.Json;
import play.mvc.BodyParser;

import views.html.*;

public class Astra extends Controller {

    private String BaseUrl;
    private String ResponderUrl;
    private String ResponderParameters;

    /**
     * Constructor sets BaseUrl, ResponderUrl and ResponderParameters properties
     */
    public Astra() {
        this.BaseUrl = "https://asapp01.aaiscloud.com/JCCC_Test/";
        this.ResponderUrl = null;
        this.ResponderParameters = null;
    }

    public String Login() throws IOException {

        /**
         * Open an HTTP Connection to the Logon.ashx page
         */
        HttpURLConnection httpcon = (HttpURLConnection) ((new URL(BaseUrl+"Logon.ashx").openConnection()));
        httpcon.setDoOutput(true);
        httpcon.setRequestProperty("Content-Type", "application/json");
        httpcon.setRequestProperty("Accept", "application/json");
        httpcon.setRequestMethod("POST");
        httpcon.connect();

        /**
         * Output user credentials over HTTP Output Stream
         */
        byte[] outputBytes = "{'username': 'cis264roomutilization', 'password':'roomutilization!APP'}".getBytes("UTF-8");
        OutputStream os = httpcon.getOutputStream();
        os.write(outputBytes);
        os.close();

        /**
         * Call Function setCookie and pass the HttpUrlConnection. Set Function will return a Cookie String used to authenticate user.
         */
        return setCookie(httpcon);

    }


    public String setCookie(HttpURLConnection httpcon) {

        /**
         * Process the HTTP Response Cookies from successful credentials
         */
        String headerName;
        ArrayList<String> cookies = new ArrayList<String>();

        for (int i=1; (headerName = httpcon.getHeaderFieldKey(i))!=null; i++) {
            if (headerName.equals("Set-Cookie")&& httpcon.getHeaderField(i) != "null") {
                cookies.add(httpcon.getHeaderField(i));
            }
        }

        httpcon.disconnect();

        /**
         * Filter cookies, create Session_ID Cookie
         */
        String cookieName = cookies.get(0);
        String cookie2 = cookies.get(1);
        String cookie1 = cookieName.substring(cookieName.indexOf("="), cookieName.indexOf(";")+2);
        cookie2 = cookie2.substring(0, cookie2.indexOf(";"));
        cookieName = cookieName.substring(0 , cookieName.indexOf("="));
        String cookie = cookieName+cookie1+cookie2;

        return cookie;

    }


    public String ApiResponder(String cookie, String url, String params) throws IOException {

        String response = "";

        this.ResponderUrl = url;
        this.ResponderParameters = params;

        //this.ResponderUrl = "~api/entity/campus?action=GET";
        //this.ResponderUrl = "~api/search/room?action=GET";
        //this.ResponderParameters = "fields=RowNumber%2CId%2CRoomName%2CRoomDescription%2CRoomNumber%2CRoomTypeName%2CBuildingCode%2CBuildingName%2CCampusName%2CCapacity%2CBuildingRoomNumberRoomName%2CCanEdit%2CCanDelete&sortOrder=%2BBuildingRoomNumberRoomName";

        /**
         * Create a new HTTP Connection request to responder, pass along Session_ID Cookie
         */
        HttpURLConnection httpcon = (HttpURLConnection) ((new URL(this.BaseUrl+this.ResponderUrl).openConnection()));
        httpcon.setDoOutput(true);
        httpcon.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        httpcon.setRequestProperty("Accept", "application/json");
        httpcon.setRequestProperty("Cookie", cookie);
        httpcon.setRequestMethod("POST");
        httpcon.connect();

        byte[] outputBytes = this.ResponderParameters.getBytes("UTF-8");
        OutputStream os = httpcon.getOutputStream();
        os.write(outputBytes);
        os.close();

        /**
         * Read/Output response from server
         */
        BufferedReader inreader = new BufferedReader(new InputStreamReader(httpcon.getInputStream()));
        String decodedString;

        while ((decodedString = inreader.readLine()) != null) {
            response += decodedString;
        }

        inreader.close();
        httpcon.disconnect();

        return response;
    }

    /**
     * Default landing page.
     * @return String
     * @throws IOException
     */
    public static Result index() throws IOException {
        return ok("No data type requested!");
    }

    /**
     * Return all campus objects.
     * @return Json
     * @throws IOException
     */
    @BodyParser.Of(BodyParser.Json.class)
    public static Result campuses() throws IOException {

        String requestResults;
        Astra api = new Astra();

        // send request and set content type
        response().setContentType("application/json");
        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "['OPTIONS', 'GET', 'POST']");
        response().setHeader("Access-Control-Allow-Headers", "Content-Type");
        requestResults = api.ApiResponder(api.Login(), "~api/entity/campus?action=GET", "");

        return ok(requestResults);
    }

    /**
     * Return all building objects.
     * @return Json
     * @throws IOException
     */
    @BodyParser.Of(BodyParser.Json.class)
    public static Result buildings() throws IOException {

        String requestResults;
        Astra api = new Astra();

        // send request and set content type
        response().setContentType("application/json");
        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "['OPTIONS', 'GET', 'POST']");
        response().setHeader("Access-Control-Allow-Headers", "Content-Type");
        requestResults = api.ApiResponder(api.Login(), "~api/entity/building?action=GET", "");

        return ok(requestResults);
    }

    /**
     * Return all room objects.
     * @return Json
     * @throws IOException
     */
    @BodyParser.Of(BodyParser.Json.class)
    public static Result rooms() throws IOException {

        String requestResults;
        Astra api = new Astra();

        // send request and set content type
        response().setContentType("application/json");
        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "['OPTIONS', 'GET', 'POST']");
        response().setHeader("Access-Control-Allow-Headers", "Content-Type");
        requestResults = api.ApiResponder(api.Login(), "~api/entity/room?action=GET", "");

        return ok(requestResults);
    }


    /**
     *
     * @return Json
     * @throws IOException
     */
    @BodyParser.Of(BodyParser.Json.class)
    public static Result scheduleByCampus( String campusId, String scheduleDate) throws IOException {

        String requestResults;
        Astra api = new Astra();

        String columns = "InstitutionId%7C0%2CCampusName%7C1%2CLocationId%7C2%2CBuildingCode%7C3%2CRoomNumber%7C4%2CRoomName%7C5%2CActivityId%7C6%2CActivityTypeCode%7C7%2CParentActivityName%7C8%2CActivityName%7C9%2CDescription%7C10%2CStartDate%7C11%2CEndDate%7C12%2CStartMinute%7C13%2CEndMinute%7C14";
        String fields = "InstitutionId%2CCampusName%2CLocationId%2CBuildingCode%2CRoomNumber%2CRoomName%2CActivityId%2CActivityTypeCode%2CParentActivityName%2CActivityName%2CDescription%2CStartDate%2CEndDate%2CStartMinute%2CEndMinute";
        String filter = "(((StartDate%3E%3D%22"+scheduleDate+"T00%3A00%3A00%22)%26%26(EndDate%3C%3D%22"+scheduleDate+"T00%3A00%3A00%22))%26%26(Location.Room.Building.CampusId%20in%20(%22"+campusId+"%22)))";

        // send request and set content type
        response().setContentType("application/json");
        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "['OPTIONS', 'GET', 'POST']");
        response().setHeader("Access-Control-Allow-Headers", "Content-Type");
        requestResults = api.ApiResponder(api.Login(), "~api/calendar/calendarList?action=get",
                "columns="+columns+"&fields="+fields+"&filter="+filter);

        return ok(requestResults);
    }

}