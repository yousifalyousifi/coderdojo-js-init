package coderdojo;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import jdk.nashorn.api.scripting.*;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("home")
public class Resource {
	StringBuilder sb;
	@POST
	@Path("hello")
	@Produces(MediaType.TEXT_PLAIN)
	public String helloWorld(@FormParam("code") String code) {
		String output = null;
		try {
			sb = new StringBuilder();
			ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
			engine.put("sb", sb);
			System.out.println(sb);
			String input = "var fun1 = function() { " + code + "};";
			engine.eval(input);
			Invocable invocable = (Invocable) engine;

			Object result = invocable.invokeFunction("fun1");
		} catch (Exception e) {
			e.printStackTrace();
			output = e.getMessage();
		}

		return sb.toString();
	}
	
	public static void consolelog(Object o, Object sb) {
		System.out.println(sb);
		StringBuilder ssb = (StringBuilder) sb;
		if(o instanceof ScriptObjectMirror) {
			ScriptObjectMirror som = (ScriptObjectMirror) o;
			ssb.append(som.getClassName()).append("  {");
			for(String k : som.keySet()) {
				ssb.append(k).append(" : ").append(som.get(k));
			}
			ssb.append("}\n");
		} else {
			ssb.append(o).append("  ").append(o.getClass().getName()).append("\n");
		}
	}

	@GET
	@Path("hello2")
	@Produces(MediaType.TEXT_HTML)
	public String helloWorld2() {
		return "<form method=\"post\" action=\"/home/hello\">" + "First name: <input name=\"fname\" type=\"text\"><br>"
				+ "Last name: <input name=\"lname\" type=\"text\"><br>"
				+ "<textarea name=\"code\" style=\"width: 226px; height: 238px;\"></textarea>"
				+ "<input value=\"Submit\" type=\"submit\">" + "</form>";
	}
}