package com.sgratzl.neo4j.graphiql.plugin;
import java.io.InputStream;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("")
public class GraphiQLResource {

  private Response render(String path) {
    String res = String.format("/WEB-INF/public/%s", path);
    InputStream resource = GraphiQLResource.class.getResourceAsStream(res);

    if (resource == null) {
      return Response.status(Response.Status.NOT_FOUND).build();
    }
    return Response.ok().entity(resource).build();
  }

  @Path("{path:.*}")
  @GET
  public Response staticResources(@PathParam("path") String path) {
    return render(path);
  }

  @Path("")
  @GET
  public Response staticResourcesIndex() {
    return render("index.html");
  }
}
