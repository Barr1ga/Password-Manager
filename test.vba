' Format date from dd/mm/yyyy to mm/dd/yyyy

=CONCATENATE(
MID(B2, SEARCH("/",B2) + 1, SEARCH("/",B2,SEARCH("/",B2)+1) - SEARCH("/",B2) - 1), 
"/",
LEFT(B2, SEARCH("/",B2,1)-1), 
"/",
RIGHT(B2,LEN(B2) - SEARCH("/", B2, SEARCH("/", B2) + 1)))