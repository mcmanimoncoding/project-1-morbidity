<<<<<<< HEAD
# project-1-morbidity



## WHO Codes and info

### Baseline API Query
http://apps.who.int/gho/athena/data/GHO/SDG_SH_DTH_RNCOM?profile=simple&format=json&filter=SEX:BTSX;COUNTRY:USA;YEAR:2016;

### List of SUB categories under GHO primary dimension.
http://apps.who.int/gho/athena/data/GHOCAT/?format=json


### Disease Cause Group: DISEASECAUSEGROUP
*U000: All Causes
*U001: Communicable
*U059: Non-Communicable Diseases
*U148: Injuries
*NA: Not Applicable

## Disease Cause Sub-Group: DISEASECAUSESUBGROUP
*U060: Malignant Neoplasms
*U079: Diabetes Melitus
*U104: Cardiovascular Diseases
*U111: Respiratory Diseases (mores subgroups we can look up)

### Country Codes: COUNTRY
*CHN: China
*IND: India
*USA: United States
*IDN: Indonesia
*BRA: Brazil

 ### Sex: SEX
 *BTSX: Both Sexes
 *MLE: Male
 *FMLE: Female
 *UNK: Unknown
 *NOA: Not Applicable
 
 ### Year:YEAR
 *actual year #

BELOW INFO CAN BE FOUND: 
http://apps.who.int/gho/data/node.resources.api?lang=en

URL Specification
The URL interface is defined as follows:
http://HOST[:PORT]/PATH/athena/INSTANCE/[DIMENSION[/CODE[,CODE2[,CODEn]][.EXTENSION][?QUERY_PARAMETERS]]]
Without any of the optional components, the URL structure
http://HOST:PORT/PATH/athena/INSTANCE/
returns a list of the available dimensions to target for download (Example 1). If you specify a dimension but nothing else, you will get the list of codes available for that dimension (Example 2). If you specify both the dimension and the code you will retrieve the corresponding data (Example 3). Multiple targets can be specified by separating them with a comma character (Example 8). 
HOST
    This is the name of the machine providing the web service. In order access public WHO data, use apps.who.int
 
PORT
    This is the port number for the web service. In order to access public WHO data, you can leave this out, or set it to the default HTTP port, 80.
 
PATH
    The application path for the web service. All WHO public data available from this web service are in the gho path.
 
INSTANCE
    This is the specific database that you wish to access. The WHO public data is available in the api instance.
 
DIMENSION
    The dimension you wish to target. See example 2 for the list of dimensions that are available.
 
CODE, CODE2, ... CODEn
    The specific code(s) for which you wish to download data. Example 3 and example 8 demonstrate how to download life expectancy statistics from the Global Health Observatory.
 
QUERY_PARAMETERS
    apikey  The API key token that has been given to you to enable access to the Athena web service. This token is currently optional, but if you have one, you should use it in all queries so that your services and applications are not interrupted when the apikey system is officially activated.
    format  The output format you wish to use. The default is XML defined by the ghodata.xsd file
    profile A modifier that allows you to specify different versions of the requested format, for example an application specific JSON output
    filter  Restricts the data returned by specifying filtering codes The filter value is a semicolon separated list of tokens of the form DIMENSION:CODE. Specific codes belonging to the same dimension are logically ORed. The different groups of dimensions are logically ANDed. For example:
COUNTRY:CAN;YEAR:2005;YEAR:2010
will only return data for Canada for the years 2005 and 2010. There are two special filter charaters. * is used to denote that the specified dimension must be present and set with any value and - denotes that the specified dimension MUST NOT be set, ie must be null.
    asof    An optional parameter allowing the user to specify a datetime stamp that will show the result as it would have looked on that particular date. This is useful when a collection of data has been retroactively changed, as often happens when we update statistics based on improved methods and models, as well as receive updated reporting data. 
This function is currently blocked in the public system.
    target  Overides the target specifed in the DIMENSION and CODE components of the URL. This is used to create URLs where the path name needs to have specific structure for the system or application making the query. The values for this parameter consist of the DIMENSION code, followed by a slash, then a list of 1 or mode CODE, separated by commas.
    language    Specify a language code. The web service will do it's best to accomodate, based on available translation strings. If it does not have strings in the specified language, it will return the English string.
    callback
jsonp   When specifying a JSON format, adding the callback or jsonp parameter will wrap the returned javascript in the specified function.
    cache   The cache parameter is used to force certain caching behaviours when the cache is enabled on the web service. The only currently allowed option is refresh which forces the web service to regenerate the underlying XML even if there is a non-expired version of the data currently available in the cache.
    x-* x- parameters are arbitrary. They are passed to the web services and returned through the QueryParameter element in the XML response. They are a way of providing user specified input to XSLT transforms. Note that when X parameters are used, the transformed response (generated if you have specified format and profile parameters) will not be cached however the underlying XML will continue to be cached.
=======
china 	35.86166	104.195397	China
india 20.593684	78.96288	India
united states 	37.09024	-95.712891	United States
indonesia  	-0.789275	113.921327	Indonesia
brazil 	-14.235004	-51.92528	Brazil

Heat Map Notes: 
Source: https://codeburst.io/how-i-created-a-heatmap-of-my-location-history-with-javascript-google-maps-972a2d1be240

Radius — Changes the radius of each data point. Range 0–50.
Intensity — Changes the maximum intensity of the data. Range 0–1000.
Opacity — Changes the opacity of the HeatMap overlay. Range: 0–1.


Items to consider/research futher.... 

1. The heat map code uses JSON. Do we need a link for JSON and an "AJAX" call?? 
>>>>>>> b9a6dd2e293be8ec9c43ed87ebce075c7af4c04f
