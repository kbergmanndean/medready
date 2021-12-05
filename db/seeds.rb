#a way that should work but doesn't
# def medications
#     response=RestClient.get "https://api.fda.gov/drug/drugsfda.json?api_key=Rgzs9smSz6olwQjP5i9dP0zRI95Z67bPtvc7pYLP&limit=20"
#     json=JSON.parse response
#     # byebug
#     if !json.nil?
#         json["results"].map do |medication|
#             if (medication["openfda"]["generic_name"][0] && medication["products"][0]["active_ingredients"][0]["strength"])
#                  Medication.create(generic_name:"#{medication["openfda"]["generic_name"][0]}", dosage:"#{medication["products"][0]["active_ingredients"][0]["strength"]}")
#             end
#         end
#     else
#         puts "error seeding medications"
#     end
# end
# medications()

#refactoring of first way
# def medications
#     response=RestClient.get "https://api.fda.gov/drug/drugsfda.json?api_key=Rgzs9smSz6olwQjP5i9dP0zRI95Z67bPtvc7pYLP&limit=20"
#     json=JSON.parse response
#     # byebug
#     if !json.nil?
#         json["results"].filter_map {|medication| Medication.create(generic_name:"#{medication["openfda"]["generic_name"][0]}", dosage: "#{medication["products"][0]["active_ingredients"][0]["strength"]}") if medication["openfda"]["generic_name"][0] && medication["products"][0]["active_ingredients"][0]["strength"]}
#     else
#         puts "error seeding medications"
#     end
# end
# medications()

#way that works:
# def medications
#     response=RestClient.get "https://api.fda.gov/drug/drugsfda.json?api_key=Rgzs9smSz6olwQjP5i9dP0zRI95Z67bPtvc7pYLP&limit=1000"
#     json=JSON.parse response
#     # byebug
#     if !json.nil?
#         json["results"].map do |medication|
#             if (medication["openfda"] && medication["openfda"]["generic_name"] && medication["openfda"]["generic_name"][0] && medication["products"] && medication["products"][0] && medication["products"][0]["active_ingredients"] && medication["products"][0]["active_ingredients"][0] && medication["products"][0]["active_ingredients"][0]["strength"])
#                  Medication.create(generic_name:"#{medication["openfda"]["generic_name"][0]}", dosage:"#{medication["products"][0]["active_ingredients"][0]["strength"]}")
#             end
#         end
#     else
#         puts "error seeding medications"
#     end
# end
# medications()

#this is what I used
def medications
    response=RestClient.get "https://api.fda.gov/drug/drugsfda.json?api_key=Rgzs9smSz6olwQjP5i9dP0zRI95Z67bPtvc7pYLP&search=route=oral&limit=1000"
    json=JSON.parse response
    # byebug
    if !json.nil?
        json["results"].map do |medication|
            if (medication["openfda"] && medication["openfda"]["generic_name"] && medication["openfda"]["generic_name"][0] && medication["products"] && medication["products"][0] && medication["products"][0]["brand_name"] && medication["products"][0]["active_ingredients"] && medication["products"][0]["active_ingredients"][0] && medication["products"][0]["active_ingredients"][0]["strength"])
                 Medication.create(generic_name:"#{medication["openfda"]["generic_name"][0]}", dosage:"#{medication["products"][0]["active_ingredients"][0]["strength"]}", brand_name:"#{medication["products"][0]["brand_name"]}")
            end
        end
    else
        puts "error seeding medications"
    end
end
medications()




