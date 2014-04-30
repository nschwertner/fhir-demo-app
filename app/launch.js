var fhirServiceUrl = getParameterByName("fhirServiceUrl");

var client = {
  "client_name": "SMART on FHIR Demo",
  "client_uri": "http://smartplatforms.org/smart-on-fhir-demo",
  "logo_uri": "http://hl7.org/implement/standards/fhir/assets/images/fhir-logo-www.png",
  "contacts": [ "info@smartplatforms.org" ],
  "redirect_uris": [ relative("index.html")],
  "response_types": ["token"],
  "grant_types": ["implicit"],
  "token_endpoint_auth_method": "none",
  "scope":  "summary search"
};

FHiR.oauth2.providers(["https://pilots.fhir.me"], function(providers){

  var matched;

  var matching = providers.filter(function(p){
    return (p.bb_api.fhir_service_uri === fhirServiceUrl);
  });

  if (matching.length === 1) {
    matched = matching[0];
  } else if (matching.length === 0) {
    matched = FHiR.oauth2.noAuthFhirProvider(fhirServiceUrl);
  } else {
    throw "Found >1 match for " + fhirServiceUrl;
  }

  FHiR.oauth2.authorize({
    client: client, 
    provider: matched,
    patientId: getParameterByName("patientId")
  });
});

function relative(url){
  return (window.location.protocol + "//" + window.location.host + window.location.pathname).match(/(.*\/)[^\/]*/)[1] + url;
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
