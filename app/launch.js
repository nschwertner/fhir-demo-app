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

FHIR.oauth2.providers(fhirServiceUrl, function(provider){
  FHIR.oauth2.authorize({
    client: client, 
    provider: provider,
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