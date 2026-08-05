/**
 * BD Roamer Localization Module
 * Scalable translation dictionary and database translation wrapper.
 * Toggle OFF (Default) -> English
 * Toggle ON -> Bangla (Standard Modern Bangla)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const UI_TRANSLATIONS = {
  "en": {
    "explore": "Explore",
    "tripBuilder": "Trip Builder",
    "guides": "Guides",
    "bookings": "Bookings",
    "profile": "Profile",
    "bdRoamer": "Ghuri",
    "exploreBangladesh": "Explore Bangladesh",
    "signInRegister": "Sign In / Register",
    "yourName": "Your Name:",
    "emailAddress": "Email Address:",
    "continue": "Continue",
    "autoFillDemo": "Auto-Fill Demo Credentials",
    "messageGuidePlaceholder": "Message {name}...",
    "secureConnectionMsg": "This is a secure connection with guide {name}. Ask about tour schedules, locations, and custom plans.",
    "onlineQuickResponse": "● Online - Answers quickly",
    "myBookingsSaves": "My Bookings & Saves",
    "manageBookingsDesc": "Manage your hotels, guides, and custom generated itineraries",
    "all": "All",
    "confirmed": "Confirmed",
    "cancelled": "Cancelled",
    "complaints": "Complaints",
    "noResults": "No Results",
    "noBookingsDesc": "Your hotels, guides, or generated trips will display here once confirmed or saved.",
    "noFilterBookingsDesc": "No {filter} bookings found.",
    "showAll": "Show All",
    "complaintLabel": "COMPLAINT",
    "pending": "Pending",
    "underReview": "Under Review",
    "resolved": "Resolved",
    "customTour": "Custom Tour",
    "created": "Created:",
    "durationLabel": "Duration:",
    "travelersLabel": "Travelers:",
    "budgetLabel": "Budget:",
    "statusLabel": "Status:",
    "removePlan": "Remove Plan",
    "cancelRemove": "Cancel / Remove",
    "savedItems": "Saved Items",
    "statusElite": "Elite",
    "status": "Status",
    "signOut": "Sign Out",
    "signInRequired": "Sign In Required",
    "signInRequiredDesc": "Access your cloud trips, history, and bookings",
    "signInOrCreate": "Sign In / Create Account",
    "appSettings": "App Settings",
    "savedDestinations": "Saved Destinations",
    "paymentMethods": "Payment Methods",
    "systemPreferences": "System Preferences",
    "helpSupport": "Help & Support Center",
    "feedback": "Feedback",
    "darkMode": "Dark Mode",
    "language": "Language",
    "versionInfo": "Ghuri Native App v1.0.0",
    "copyrightInfo": "© 2026 Ghuri. Built Natively with Expo.",
    "backToAgencies": "Back to agencies",
    "backToGuides": "Back to guides",
    "backToProfile": "Back to profile",
    "backToBookings": "Back to Bookings",
    "divisionLabel": "Division:",
    "coveredDestinations": "Covered destinations:",
    "startingPrice": "Starting price:",
    "reviewsLabel": "reviews",
    "viewProfile": "View Profile",
    "bookAppointment": "Book Appointment",
    "unavailable": "Unavailable",
    "yearsExperience": "{years} years experience",
    "ageLabel": "Age:",
    "languagesLabel": "Languages:",
    "specializationsLabel": "Specializations:",
    "popularDestinations": "Popular destinations:",
    "safetyTraining": "Safety training:",
    "guideFee": "Guide fee",
    "bookGuideTitle": "Book {name}",
    "bookGuideDesc": "Reserve your tour guide and add it to your booking list.",
    "travelers": "Travelers",
    "contactNumber": "Contact number",
    "tourDestination": "Tour destination",
    "startDate": "Start date",
    "endDate": "End date",
    "hotelName": "Hotel name",
    "hotelAddress": "Hotel address",
    "specialRequests": "Special requests",
    "confirmBooking": "Confirm Booking",
    "selectStartDate": "Select start date",
    "selectEndDate": "Select end date",
    "close": "Close",
    "tripOverview": " Trip Overview",
    "startingFrom": "Starting From",
    "destinationArea": "Destination Area",
    "duration": "Duration",
    "budgetTier": "Budget Tier",
    "travelStyle": "Travel Style",
    "optimizedRoute": " Optimized Travel Route",
    "completeTimeline": " Complete Trip Timeline",
    "overnightStay": "Overnight Stay:",
    "transitMode": "Transit mode:",
    "dayLabel": "DAY",
    "featuredAttractions": " Featured Attractions",
    "whyVisit": "Why Visit:",
    "transportationGuide": "Transportation Guide",
    "fromStartingLocation": "From Starting Location ({location})",
    "alternativeTransit": "Alternative Transit Options:",
    "estTravelTime": "Est. Travel Time:",
    "localTransportInside": "Local Transportation inside {division}",
    "estLocalCost": "Estimated local daily transit cost:",
    "perPerson": "per person",
    "localFoodRecs": " Local Food Recommendations",
    "famousDishesTry": "Famous Local Dishes to Try:",
    "popularRestaurants": "Popular Local Restaurants:",
    "localFood": "Local Food",
    "accommodationSuggestions": " Accommodation Suggestions",
    "ratePerNight": "Rate per night",
    "rating": "Rating",
    "suitableTraveler": "Suitable traveler type",
    "detailedCosts": " Detailed Cost Calculations",
    "transportationCost": "Transportation Cost",
    "accommodationCost": "Accommodation Cost",
    "foodDiningCost": "Food & Dining Cost",
    "entranceCost": "Attraction Entrance Cost",
    "miscContingency": " Miscellaneous & Contingency",
    "totalTripCost": "Total Trip Cost:",
    "costPerPerson": "Cost Per Person:",
    "classification": "Classification:",
    "downloadPlan": "Download Plan",
    "feedbackComplaints": "Feedback & Complaints",
    "feedbackDesc": "Help us improve by sharing your thoughts or reporting issues",
    "yourNameRequired": "Your Name *",
    "contactNumberRequired": "Contact Number *",
    "touristPlaceRequired": "Tourist Place Name *",
    "feedbackMessageRequired": "Feedback / Complaint Message *",
    "uploadImages": "Upload Images (Max 5)",
    "addPhotoGallery": "Add Photo from Gallery",
    "submitFeedback": "Submit Feedback",
    "setupTrip": "Setup Trip",
    "selectDivisionMsg": "Please select a division to explore.",
    "noSpots": "No Spots",
    "noSpotsMsg": "No spots available for this division in our guide system yet.",
    "tripSavedMsg": " Generated trip saved to Bookings!",
    "autoDetectLocation": "Auto-Detect Location",
    "detectedLocation": " Detected Location: {city}",
    "locationDenied": "Location Access Denied",
    "notSupported": "Not Supported",
    "enterFromLocationMsg": "Please enter where you are traveling from.",
    "selectDivisionError": "Please select a division.",
    "noDestinationsFound": "No Destinations Found",
    "noSpotsInDivisionMsg": "No tourist spots available in {division}.",
    "addOneDestinationMsg": "Please add at least one destination.",
    "feasibilityErrorTitle": "Infeasible Tour Plan ",
    "ok": "OK",
    "yes": "Yes",
    "no": "No",
    "cancel": "Cancel",
    "signInOut": "Sign Out",
    "signOutConfirm": "Are you sure you want to sign out?",
    "missingFields": "Missing Fields",
    "missingFieldsMsg": "Please complete all required fields (Name, Contact Number, Place Name, and Message).",
    "invalidPhone": "Invalid Contact Number",
    "invalidPhoneMsg": "Contact number must be exactly 11 digits.",
    "feedbackSubmitted": "Feedback Submitted",
    "feedbackSubmittedMsg": "Thank you. Your feedback has been submitted successfully.",
    "searchPlacesPlaceholder": "Search destinations...",
    "searchGuidesPlaceholder": "Search guides by name or specialization...",
    "whereTravelingFrom": "Where are you traveling from?",
    "autoDetectBtn": "Auto Detect",
    "howManyTravelers": "How many travelers?",
    "selectTravelStyle": "Select Travel Style",
    "exploreEntireDivision": "Explore Entire Division?",
    "selectDivisionToExplore": "Select Division to Explore",
    "selectCategoriesOptional": "Select Categories (Optional)",
    "chooseCustomPlaces": "Or Choose Custom Places",
    "addCustomPlacePlaceholder": "Type place name to add...",
    "addBtn": "Add",
    "buildMyItinerary": "Build My Itinerary",
    "customGeneratedItinerary": "Custom Generated Itinerary",
    "rePlanTrip": "Re-Plan Trip",
    "saveTripToBookings": "Save Trip to Bookings",
    "daysCount": "{days} Days / {nights} Nights",
    "ratePerNightVal": "৳{rate} BDT",
    "intercityLabel": "Intercity",
    "localLabel": "Local",
    "roomCount": "room(s)",
    "dailyAverage": "Daily Average",
    "estTravelTimeVal": "Est. Travel Time",
    "estTransitCostVal": "Estimated local daily transit cost: ৳{cost} BDT per person.",
    "welcomeDinner": "Enjoy a welcome dinner at a local seafood or regional restaurant.",
    "arriveCheckIn": "Arrive & check-in at {hotel}",
    "lunchLocalEatery": "Lunch at a traditional local eatery",
    "departFromStart": "Depart from starting location",
    "dinnerStroll": "Dinner & evening stroll near hotel",
    "morningVisit": "Early morning visit to a final attraction.",
    "souvenirShopping": "Souvenir shopping at local markets.",
    "checkoutJourney": "Hotel check-out and journey back home.",
    "breakfastHotel": "Breakfast at hotel",
    "localCraftShopping": "Local craft & souvenir shopping",
    "checkoutHotel": "Checkout from hotel",
    "finalLunch": "Final lunch at a favourite local spot",
    "departHome": "Depart for home",
    "arriveHome": "Arrive home — trip completed!",
    "fullDayExploration": "Full day exploration of {spot} surroundings.",
    "engageLocalActivities": "Engage in local activities, trekking, boating, or cultural visits.",
    "sampleStreetFood": "Sample traditional street food and local specialties.",
    "lunchBreakTry": "Lunch break — try: {food}",
    "dinnerTry": "Dinner — try: {food}",
    "estCostTotal": "Total Trip Cost:",
    "costPerPersonTotal": "Cost Per Person:",
    "classificationTotal": "Classification:",
    "complaintStatusPending": "Pending",
    "complaintStatusReview": "Under Review",
    "complaintStatusResolved": "Resolved",
    "cancelBooking": "Cancel Booking",
    "cancelBookingConfirm": "Are you sure you want to cancel your booking for {name}?",
    "yesCancel": "Yes, Cancel",
    "cancelledBookingMsg": "Cancelled booking for {name}",
    "roomReservation": "Room reservation, 1 night",
    "visitItinerary": "Visit itinerary - {hours}",
    "addedToItineraryMsg": " Added {name} to itinerary!",
    "guideBookingMsg": "Guide booking for {dest}",
    "bookingConfirmedMsg": " Booking confirmed for {name}!",
    "guideBookingSuccess": "Guide booking completed successfully.",
    "invalidPhoneError": "Contact number must be exactly 11 digits.",
    "incompleteFieldsError": "Please complete the required guide booking fields.",
    "guideOverlapError": "This guide is already booked for the selected dates. Please choose another guide or travel dates.",
    "welcomeMsg": "Welcome, {name}!",
    "signedOutSuccess": "Signed out successfully.",
    "viewSavedDestinations": "Saved Destinations",
    "viewPaymentMethods": "Payment Methods",
    "viewSystemPrefs": "System Preferences",
    "viewHelpCenter": "Help & Support Center"
  },
  "bn": {
    "explore": "অন্বেষণ",
    "tripBuilder": "ট্যুর প্ল্যানার",
    "guides": "গাইডস",
    "bookings": "বুকিংস",
    "profile": "প্রোফাইল",
    "bdRoamer": "ঘুরি",
    "exploreBangladesh": "বাংলাদেশ অন্বেষণ করুন",
    "signInRegister": "সাইন ইন / নিবন্ধন",
    "yourName": "আপনার নাম:",
    "emailAddress": "ইমেইল ঠিকানা:",
    "continue": "এগিয়ে যান",
    "autoFillDemo": "ডেমো তথ্য অটো-ফিল করুন",
    "messageGuidePlaceholder": "{name}-কে বার্তা পাঠান...",
    "secureConnectionMsg": "গাইড {name}-এর সাথে এটি একটি নিরাপদ সংযোগ। ট্যুর সময়সূচী, স্থান এবং কাস্টম প্ল্যান সম্পর্কে জিজ্ঞাসা করুন।",
    "onlineQuickResponse": "● অনলাইন - দ্রুত উত্তর দেন",
    "myBookingsSaves": "আমার বুকিংস এবং সংরক্ষিত তালিকা",
    "manageBookingsDesc": "আপনার হোটেল, গাইড এবং কাস্টম ট্যুর প্ল্যানগুলো পরিচালনা করুন",
    "all": "সব",
    "confirmed": "নিশ্চিত",
    "cancelled": "বাতিল",
    "complaints": "অভিযোগ",
    "noResults": "কোনো ফলাফল নেই",
    "noBookingsDesc": "আপনার হোটেল, গাইড বা তৈরি করা ট্যুর প্ল্যানগুলো নিশ্চিত বা সংরক্ষণ করার পর এখানে প্রদর্শিত হবে।",
    "noFilterBookingsDesc": "কোনো {filter} বুকিং পাওয়া যায়নি।",
    "showAll": "সব দেখান",
    "complaintLabel": "অভিযোগ",
    "pending": "পেন্ডিং",
    "underReview": "পর্যালোচনাধীন",
    "resolved": "সমাধানকৃত",
    "customTour": "কাস্টম ট্যুর",
    "created": "তৈরি করা হয়েছে:",
    "durationLabel": "সময়কাল:",
    "travelersLabel": "ভ্রমণকারী:",
    "budgetLabel": "বাজেট:",
    "statusLabel": "অবস্থা:",
    "removePlan": "প্ল্যান মুছুন",
    "cancelRemove": "বাতিল / মুছুন",
    "savedItems": "সংরক্ষিত আইটেম",
    "statusElite": "এলিট",
    "status": "অবস্থা",
    "signOut": "সাইন আউট",
    "signInRequired": "সাইন ইন প্রয়োজন",
    "signInRequiredDesc": "আপনার ক্লাউড ট্রিপ, ইতিহাস এবং বুকিংস অ্যাক্সেস করুন",
    "signInOrCreate": "সাইন ইন / অ্যাকাউন্ট তৈরি করুন",
    "appSettings": "অ্যাপ সেটিংস",
    "savedDestinations": "সংরক্ষিত গন্তব্য",
    "paymentMethods": "পেমেন্ট পদ্ধতি",
    "systemPreferences": "সিস্টেম পছন্দসমূহ",
    "helpSupport": "হেল্প ও সাপোর্ট সেন্টার",
    "feedback": "মতামত",
    "darkMode": "ডার্ক মোড",
    "language": "ভাষা (Language)",
    "versionInfo": "ঘুরি নেটিভ অ্যাপ v1.0.0",
    "copyrightInfo": "© ২০২৬ ঘুরি। এক্সপো দিয়ে তৈরি।",
    "backToAgencies": "এজেন্সিতে ফিরে যান",
    "backToGuides": "গাইডে ফিরে যান",
    "backToProfile": "প্রোফাইলে ফিরে যান",
    "backToBookings": "বুকিংসে ফিরে যান",
    "divisionLabel": "বিভাগ:",
    "coveredDestinations": "আওতাভুক্ত গন্তব্য:",
    "startingPrice": "শুরু মূল্য:",
    "reviewsLabel": "রিভিউ",
    "viewProfile": "প্রোফাইল দেখুন",
    "bookAppointment": "অ্যাপয়েন্টমেন্ট বুক করুন",
    "unavailable": "অনুপলব্ধ",
    "yearsExperience": "{years} বছরের অভিজ্ঞতা",
    "ageLabel": "বয়স:",
    "languagesLabel": "ভাষাসমূহ:",
    "specializationsLabel": "বিশেষজ্ঞতা:",
    "popularDestinations": "জনপ্রিয় গন্তব্য:",
    "safetyTraining": "নিরাপত্তা প্রশিক্ষণ:",
    "guideFee": "গাইড ফি",
    "bookGuideTitle": "{name}-কে বুক করুন",
    "bookGuideDesc": "আপনার ট্যুর গাইড রিজার্ভ করুন এবং এটি বুকিং তালিকায় যুক্ত করুন।",
    "travelers": "ভ্রমণকারী",
    "contactNumber": "যোগাযোগ নম্বর",
    "tourDestination": "ট্যুর গন্তব্য",
    "startDate": "শুরুর তারিখ",
    "endDate": "শেষের তারিখ",
    "hotelName": "হোটেলের নাম",
    "hotelAddress": "হোটেলের ঠিকানা",
    "specialRequests": "বিশেষ অনুরোধ",
    "confirmBooking": "বুকিং নিশ্চিত করুন",
    "selectStartDate": "শুরুর তারিখ নির্বাচন করুন",
    "selectEndDate": "শেষের তারিখ নির্বাচন করুন",
    "close": "বন্ধ করুন",
    "tripOverview": " ট্যুর সারসংক্ষেপ",
    "startingFrom": "যাত্রা শুরুর স্থান",
    "destinationArea": "গন্তব্য এলাকা",
    "duration": "সময়কাল",
    "budgetTier": "বাজেটের ধরন",
    "travelStyle": "ভ্রমণ শৈলী",
    "optimizedRoute": " অপ্টিমাইজড ভ্রমণ রুট",
    "completeTimeline": " সম্পূর্ণ ভ্রমণ সময়রেখা",
    "overnightStay": "রাত্রিকালীন অবস্থান:",
    "transitMode": "যাতায়াত মাধ্যম:",
    "dayLabel": "দিন",
    "featuredAttractions": " প্রধান আকর্ষণসমূহ",
    "whyVisit": "কেন ভ্রমণ করবেন:",
    "transportationGuide": "পরিবহন নির্দেশিকা",
    "fromStartingLocation": "যাত্রা শুরুর স্থান ({location}) থেকে",
    "alternativeTransit": "বিকল্প যাতায়াত অপশনসমূহ:",
    "estTravelTime": "আনুমানিক ভ্রমণ সময়:",
    "localTransportInside": "{division} বিভাগের ভেতরে স্থানীয় যাতায়াত",
    "estLocalCost": "আনুমানিক স্থানীয় দৈনিক যাতায়াত খরচ:",
    "perPerson": "প্রতি জন",
    "localFoodRecs": " স্থানীয় খাবার সুপারিশ",
    "famousDishesTry": "অবশ্যই ট্রাই করার মতো স্থানীয় খাবার:",
    "popularRestaurants": "জনপ্রিয় স্থানীয় রেস্তোরাঁ:",
    "localFood": "স্থানীয় খাবার",
    "accommodationSuggestions": " থাকার ব্যবস্থার সুপারিশ",
    "ratePerNight": "প্রতি রাতের ভাড়া",
    "rating": "রেটিং",
    "suitableTraveler": "উপযুক্ত ভ্রমণকারীর ধরন",
    "detailedCosts": " বিস্তারিত খরচ হিসাব",
    "transportationCost": "যাতায়াত খরচ",
    "accommodationCost": "আবাসন খরচ",
    "foodDiningCost": "খাবার ও ডাইনিং খরচ",
    "entranceCost": "আকর্ষণ প্রবেশ ফি",
    "miscContingency": " বিবিধ ও জরুরি খরচ",
    "totalTripCost": "মোট ভ্রমণ খরচ:",
    "costPerPerson": "জনপ্রতি খরচ:",
    "classification": "শ্রেণীবিভাগ:",
    "downloadPlan": "প্ল্যান ডাউনলোড করুন",
    "feedbackComplaints": "মতামত ও অভিযোগ",
    "feedbackDesc": "আপনার চিন্তাভাবনা শেয়ার করে বা সমস্যা রিপোর্ট করে আমাদের উন্নতি করতে সাহায্য করুন",
    "yourNameRequired": "আপনার নাম *",
    "contactNumberRequired": "যোগাযোগ নম্বর *",
    "touristPlaceRequired": "পর্যটন স্থানের নাম *",
    "feedbackMessageRequired": "মতামত / অভিযোগ বার্তা *",
    "uploadImages": "ছবি আপলোড করুন (সর্বোচ্চ ৫টি)",
    "addPhotoGallery": "গ্যালারি থেকে ফটো যুক্ত করুন",
    "submitFeedback": "মতামত জমা দিন",
    "setupTrip": "ট্রিপ সেটআপ",
    "selectDivisionMsg": "অনুগ্রহ করে অন্বেষণের জন্য একটি বিভাগ নির্বাচন করুন।",
    "noSpots": "কোনো স্পট নেই",
    "noSpotsMsg": "আমাদের গাইড সিস্টেমে এখনও এই বিভাগের জন্য কোনো স্পট উপলব্ধ নেই।",
    "tripSavedMsg": " তৈরি করা ট্যুর প্ল্যান বুকিংসে সংরক্ষিত হয়েছে!",
    "autoDetectLocation": "স্বয়ংক্রিয় অবস্থান সনাক্তকরণ",
    "detectedLocation": " সনাক্তকৃত অবস্থান: {city}",
    "locationDenied": "অবস্থান অ্যাক্সেস প্রত্যাখ্যান করা হয়েছে",
    "notSupported": "সমর্থিত নয়",
    "enterFromLocationMsg": "অনুগ্রহ করে আপনি কোথা থেকে ভ্রমণ করছেন তা লিখুন।",
    "selectDivisionError": "অনুগ্রহ করে একটি বিভাগ নির্বাচন করুন।",
    "noDestinationsFound": "কোনো গন্তব্য খুঁজে পাওয়া যায়নি",
    "noSpotsInDivisionMsg": "{division} বিভাগে কোনো পর্যটন স্পট উপলব্ধ নেই।",
    "addOneDestinationMsg": "অনুগ্রহ করে অন্তত একটি গন্তব্য যুক্ত করুন।",
    "feasibilityErrorTitle": "অযৌক্তিক ট্যুর প্ল্যান ",
    "ok": "ঠিক আছে",
    "yes": "হ্যাঁ",
    "no": "না",
    "cancel": "বাতিল",
    "signInOut": "সাইন আউট",
    "signOutConfirm": "আপনি কি নিশ্চিত যে আপনি সাইন আউট করতে চান?",
    "missingFields": "তথ্য ঘাটতি",
    "missingFieldsMsg": "অনুগ্রহ করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন (নাম, যোগাযোগ নম্বর, স্থানের নাম এবং বার্তা)।",
    "invalidPhone": "অকার্যকর যোগাযোগ নম্বর",
    "invalidPhoneMsg": "যোগাযোগ নম্বর অবশ্যই ১১ ডিজিটের হতে হবে।",
    "feedbackSubmitted": "মতামত জমা দেওয়া হয়েছে",
    "feedbackSubmittedMsg": "ধন্যবাদ। আপনার মতামত সফলভাবে জমা দেওয়া হয়েছে।",
    "searchPlacesPlaceholder": "গন্তব্য অনুসন্ধান করুন...",
    "searchGuidesPlaceholder": "নাম বা দক্ষতা দিয়ে গাইড খুঁজুন...",
    "whereTravelingFrom": "আপনি কোথা থেকে ভ্রমণ করছেন?",
    "autoDetectBtn": "শনাক্ত করুন",
    "howManyTravelers": "ভ্রমণকারী সংখ্যা কত?",
    "selectTravelStyle": "ভ্রমণ শৈলী নির্বাচন করুন",
    "exploreEntireDivision": "সম্পূর্ণ বিভাগ অন্বেষণ করবেন?",
    "selectDivisionToExplore": "অন্বেষণের জন্য বিভাগ নির্বাচন করুন",
    "selectCategoriesOptional": "ক্যাটাগরি নির্বাচন করুন (ঐচ্ছিক)",
    "chooseCustomPlaces": "অথবা কাস্টম স্থান পছন্দ করুন",
    "addCustomPlacePlaceholder": "যোগ করতে স্থানের নাম লিখুন...",
    "addBtn": "যোগ করুন",
    "buildMyItinerary": "আমার রুট ম্যাপ তৈরি করুন",
    "customGeneratedItinerary": "কাস্টম তৈরি ভ্রমণ রুট",
    "rePlanTrip": "আবার পরিকল্পনা করুন",
    "saveTripToBookings": "বুকিংসে ট্রিপ সংরক্ষণ করুন",
    "daysCount": "{days} দিন / {nights} রাত",
    "ratePerNightVal": "৳{rate} টাকা",
    "intercityLabel": "আন্তঃনগর",
    "localLabel": "স্থানীয়",
    "roomCount": "টি রুম",
    "dailyAverage": "দৈনিক গড়",
    "estTravelTimeVal": "আনুমানিক ভ্রমণ সময়",
    "estTransitCostVal": "জনপ্রতি আনুমানিক স্থানীয় দৈনিক যাতায়াত খরচ: ৳{cost} টাকা।",
    "welcomeDinner": "স্থানীয় সি-ফুড বা ঐতিহ্যবাহী রেস্তোরাঁয় স্বাগত ডিনার উপভোগ করুন।",
    "arriveCheckIn": "{hotel}-এ পৌঁছান এবং চেক-ইন করুন।",
    "lunchLocalEatery": "ঐতিহ্যবাহী স্থানীয় ভোজনশালায় দুপুরের খাবার উপভোগ করুন",
    "departFromStart": "যাত্রা শুরুর স্থান থেকে রওনা হন",
    "dinnerStroll": "হোটেলের কাছাকাছি রাতের খাবার এবং সান্ধ্যকালীন হাঁটাচলা",
    "morningVisit": "ভোরে একটি শেষ আকর্ষণে ভ্রমণ করুন।",
    "souvenirShopping": "স্থানীয় বাজারে স্মৃতিচিহ্ন কেনাকাটা।",
    "checkoutJourney": "হোটেল চেক-আউট এবং বাড়ির উদ্দেশ্যে যাত্রা।",
    "breakfastHotel": "হোটেল থেকে সকালের নাস্তা করুন",
    "localCraftShopping": "স্থানীয় কারুশিল্প ও স্মৃতিচিহ্ন কেনাকাটা",
    "checkoutHotel": "হোটেল থেকে চেক-আউট করুন",
    "finalLunch": "প্রিয় স্থানীয় কোনো স্পটে দুপুরের শেষ খাবার",
    "departHome": "বাড়ির উদ্দেশ্যে রওনা হন",
    "arriveHome": "বাড়িতে পৌঁছান — ট্রিপ সমাপ্ত!",
    "fullDayExploration": "{spot}-এর আশেপাশের এলাকায় সারাদিন অন্বেষণ করুন।",
    "engageLocalActivities": "স্থানীয় ক্রিয়াকলাপ, ট্র্যাকিং, বোটিং বা সাংস্কৃতিক ভ্রমণে অংশ নিন।",
    "sampleStreetFood": "ঐতিহ্যবাহী স্ট্রিট ফুড এবং স্থানীয় বিশেষ খাবার চেখে দেখুন।",
    "lunchBreakTry": "দুপুরের খাবারের বিরতি — ট্রাই করুন: {food}",
    "dinnerTry": "রাতের খাবার — ট্রাই করুন: {food}",
    "estCostTotal": "মোট ভ্রমণ খরচ:",
    "costPerPersonTotal": "জনপ্রতি খরচ:",
    "classificationTotal": "শ্রেণীবিভাগ:",
    "complaintStatusPending": "পেন্ডিং",
    "complaintStatusReview": "পর্যালোচনাধীন",
    "complaintStatusResolved": "সমাধানকৃত",
    "cancelBooking": "বুকিং বাতিল",
    "cancelBookingConfirm": "আপনি কি নিশ্চিত যে আপনি {name}-এর বুকিং বাতিল করতে চান?",
    "yesCancel": "হ্যাঁ, বাতিল করুন",
    "cancelledBookingMsg": "{name}-এর বুকিং বাতিল করা হয়েছে",
    "roomReservation": "রুম বুকিং, ১ রাত",
    "visitItinerary": "ভ্রমণ সময়সূচী - {hours}",
    "addedToItineraryMsg": " {name} ভ্রমণ তালিকায় যুক্ত করা হয়েছে!",
    "guideBookingMsg": "{dest} গন্তব্যের জন্য গাইড বুকিং",
    "bookingConfirmedMsg": " {name}-এর বুকিং নিশ্চিত করা হয়েছে!",
    "guideBookingSuccess": "গাইড বুকিং সফলভাবে সম্পন্ন হয়েছে।",
    "invalidPhoneError": "যোগাযোগ নম্বর অবশ্যই ১১ ডিজিটের হতে হবে।",
    "incompleteFieldsError": "অনুগ্রহ করে প্রয়োজনীয় গাইড বুকিংয়ের তথ্য সম্পূর্ণ করুন।",
    "guideOverlapError": "নির্বাচিত তারিখগুলোতে এই গাইড ইতিমধ্যে বুক করা রয়েছে। অনুগ্রহ করে অন্য গাইড বা ভ্রমণের তারিখ নির্বাচন করুন।",
    "welcomeMsg": "স্বাগতম, {name}!",
    "signedOutSuccess": "সফলভাবে সাইন আউট করা হয়েছে।",
    "viewSavedDestinations": "সংরক্ষিত গন্তব্য",
    "viewPaymentMethods": "পেমেন্ট পদ্ধতি",
    "viewSystemPrefs": "সিস্টেম পছন্দসমূহ",
    "viewHelpCenter": "হেল্প ও সাপোর্ট সেন্টার"
  }
};

export const DIVISION_TRANSLATIONS = {
  "Dhaka": {
    "name": "ঢাকা",
    "tagline": "মসজিদ ও রিকশার শহর"
  },
  "Chattogram": {
    "name": "চট্টগ্রাম",
    "tagline": "বন্দর নগরী এবং পাহাড় ও সমুদ্রের শহর"
  },
  "Sylhet": {
    "name": "সিলেট",
    "tagline": "দুটি পাতা একটি কুঁড়ির দেশ"
  },
  "Rajshahi": {
    "name": "রাজশাহী",
    "tagline": "রেশম নগরী এবং আমের রাজধানী"
  },
  "Khulna": {
    "name": "খুলনা",
    "tagline": "শিল্প নগরী এবং সুন্দরবনের প্রবেশদ্বার"
  },
  "Barishal": {
    "name": "বরিশাল",
    "tagline": "বাংলার ভেনিস এবং শস্যভাণ্ডার"
  },
  "Rangpur": {
    "name": "রংপুর",
    "tagline": "ভাওয়াইয়ার দেশ এবং তামাকের কেন্দ্র"
  },
  "Mymensingh": {
    "name": "ময়মনসিংহ",
    "tagline": "ময়মনসিংহ গীতিকার দেশ এবং গারো পাহাড় অঞ্চল"
  }
};

export const CATEGORY_TRANSLATIONS = {
  "Historical": "ঐতিহাসিক",
  "Natural/Scenic": "প্রাকৃতিক/মনোরম",
  "Hill/Hill-Tracts": "পাহাড়/পার্বত্য অঞ্চল",
  "Sea/Beach": "সমুদ্র/সৈকত",
  "River/Waterfall": "নদী/ঝরনা",
  "Religious": "ধর্মীয়",
  "Adventure/Wildlife": "অ্যাডভেঞ্চার/বন্যপ্রাণী",
  "Urban/Modern": "নগর/আধুনিক"
};

export const BUDGET_TRANSLATIONS = {
  "Low Budget": "কম বাজেট",
  "Medium Budget": "মাঝারি বাজেট",
  "Premium Budget": "প্রিমিয়াম বাজেট",
  "Low Budget average": "কম বাজেট",
  "Medium Budget average": "মাঝারি বাজেট",
  "Premium Budget average": "প্রিমিয়াম বাজেট"
};

export const GENERAL_TRANSLATIONS = {
  "Bengali": "বাংলা",
  "English": "ইংরেজি",
  "Available": "উপলব্ধ",
  "On Duty": "কর্মরত",
  "Yes": "হ্যাঁ",
  "No": "না",
  "Free": "ফ্রি",
  "1 Person": "১ জন",
  "2 People": "২ জন",
  "5 People": "৫ জন",
  "Group Tour": "গ্রুপ ট্যুর",
  "Pending": "পেন্ডিং",
  "Under Review": "পর্যালোচনাধীন",
  "Resolved": "সমাধানকৃত",
  "Planned": "পরিকল্পিত",
  "Upcoming": "আসন্ন",
  "Ongoing": "চলমান",
  "Completed": "সম্পন্ন",
  "Cancelled": "বাতিল"
};

export const DEST_DATA_TRANSLATIONS = {
  "Lalbagh Fort": {
    "name": "লালবাগ কেল্লা",
    "description": "সপ্তদশ শতাব্দীর মুঘল দুর্গ যা চমৎকার স্থাপত্যশৈলী এবং ঐতিহাসিক গুরুত্বের জন্য পরিচিত।",
    "fullHistory": "১৬৭৮ সালে মুঘল সম্রাট আওরঙ্গজেবের শাসনামলে যুবরাজ আজম শাহ এটি নির্মাণ শুরু করেন। এটি দক্ষিণ এশিয়ার অন্যতম দর্শনীয় মুঘল স্থাপত্য নিদর্শন। দুর্গটিতে পরী বিবির মাজার, দরবার হল এবং একটি সুন্দর বাগান রয়েছে।"
  },
  "Ahsan Manzil": {
    "name": "আহসান মঞ্জিল",
    "description": "ঢাকার বুড়িগঙ্গা নদীর তীরে অবস্থিত একটি সুন্দর গোলাপী রাজপ্রাসাদ, যা ঢাকার নবাবদের সরকারি বাসভবন ছিল।",
    "fullHistory": "ঊনবিংশ শতাব্দীতে নির্মিত এই প্রাসাদটি ঢাকার নবাবদের ঐশ্বর্য এবং জীবনযাত্রার প্রতীক। এটি এখন একটি রাষ্ট্রীয় জাদুঘর হিসেবে ব্যবহৃত হচ্ছে।"
  },
  "Star Mosque": {
    "name": "তারা মসজিদ",
    "description": "পুরনো ঢাকার একটি ঐতিহ্যবাহী মসজিদ যা চীনা মাটির টুকরো দিয়ে তৈরি চমৎকার তারার নকশার জন্য বিখ্যাত।",
    "fullHistory": "১৮ শতকে নির্মিত এই মসজিদটির ভেতরের ও বাইরের দেওয়ালে তারার মতো উজ্জ্বল ফুল ও নকশা অঙ্কিত রয়েছে। এটি ইন্দো-ইসলামিক স্থাপত্যের একটি বিরল উদাহরণ।"
  },
  "Dhakeshwari Temple": {
    "name": "ঢাকেশ্বরী মন্দির",
    "description": "পুরনো ঢাকার একটি পবিত্র ও ঐতিহাসিক হিন্দু মন্দির, যা ঢাকার জাতীয় মন্দির হিসেবে বিবেচিত হয়।",
    "fullHistory": "দ্বাদশ শতাব্দীতে সেন রাজবংশের রাজা বল্লাল সেন এটি নির্মাণ করেন। মন্দিরটির শান্ত পরিবেশ এবং ঐতিহ্য হাজার বছর ধরে ভক্তদের আকর্ষণ করে আসছে।"
  },
  "Baitul Mukarram": {
    "name": "বায়তুল মোকাররম",
    "description": "বাংলাদেশের জাতীয় মসজিদ, যা আধুনিক স্থাপত্যশৈলী এবং কাবার আদলে তৈরি নকশার জন্য পরিচিত।",
    "fullHistory": "১৯৬৮ সালে নির্মিত এই মসজিদটি ঢাকার প্রাণকেন্দ্রে অবস্থিত। এটি দক্ষিণ এশিয়ার অন্যতম বৃহত্তম মসজিদ, যেখানে একসাথে হাজার হাজার মানুষ নামাজ আদায় করতে পারেন।"
  },
  "Bangbandhu Memorial Museum": {
    "name": "বঙ্গবন্ধু স্মৃতি জাদুঘর",
    "description": "জাতির জনক বঙ্গবন্ধু শেখ মুজিবুর রহমানের স্মৃতিবিজড়িত ঐতিহাসিক ধানমন্ডি ৩২ নম্বরের বাসভবন, যা এখন জাদুঘর।",
    "fullHistory": "স্বাধীনতার রূপকার শেখ মুজিবুর রহমানের স্মৃতি এবং জীবন সংগ্রামকে ধরে রাখার জন্য তার বাসভবনটিকে জাদুঘরে রূপান্তর করা হয়েছে। এখানে তার ব্যবহৃত ব্যক্তিগত জিনিসপত্র ও ছবি সংরক্ষিত রয়েছে।"
  },
  "Bara Katra": {
    "name": "বড় কাটরা",
    "description": "পুরনো ঢাকার মুঘল আমলের একটি ঐতিহাসিক সরাইখানা ও দুর্গ-ফটক।",
    "fullHistory": "১৬৪৪ সালে মুঘল সম্রাট শাহজাহানের পুত্র শাহ সুজার নির্দেশে এটি নির্মিত হয়। এটি মূলত পরিব্রাজক এবং ব্যবসায়ীদের সরাইখানা হিসেবে ব্যবহৃত হতো।"
  },
  "Choto Katra": {
    "name": "ছোট কাটরা",
    "description": "বড় কাটরার কাছে অবস্থিত মুঘল আমলের আরেকটি চমৎকার সরাইখানা।",
    "fullHistory": "১৬৬৩ সালে সুবেদার শায়েস্তা খাঁ এটি নির্মাণ করেন। সরাইখানা হিসেবে নির্মিত এই স্থাপনাটি মুঘল স্থাপত্যের এক অনন্য ঐতিহাসিক নিদর্শন।"
  },
  "Sonargaon": {
    "name": "সোনারগাঁও",
    "description": "বাংলার প্রাচীন রাজধানী এবং ঐতিহাসিক পানাম নগর ও লোকশিল্প জাদুঘরের অবস্থানস্থল।",
    "fullHistory": "প্রাচীন ঈশা খাঁর রাজধানী সোনারগাঁও ছিল অত্যন্ত সমৃদ্ধ। এখানকার পানাম নগরীর ধ্বংসাবশেষ এবং লোক ও কারুশিল্প জাদুঘর পর্যটকদের মুগ্ধ করে।"
  },
  "Bhawal Rajbari": {
    "name": "ভাওয়াল রাজবাড়ী",
    "description": "গাজীপুরে অবস্থিত ভাওয়াল রাজপরিবারের একটি ঐতিহাসিক জমিদার প্রাসাদ ও উদ্যান।",
    "fullHistory": "১৯ শতকে নির্মিত এই রাজপ্রাসাদটি ভাওয়াল রাজাদের প্রশাসনিক কেন্দ্র ছিল। এর নান্দনিক স্থাপত্য এবং বিশাল দীঘি ইতিহাসপ্রেমীদের আকর্ষণ করে।"
  },
  "Baliati Palace": {
    "name": "বালিয়াটি প্রাসাদ",
    "description": "মানিকগঞ্জে অবস্থিত চমৎকার নকশাকৃত জমিদার প্রাসাদ, যা বিশাল পুকুর এবং বাগান দ্বারা বেষ্টিত।",
    "fullHistory": "১৮ শতকের শেষভাগে বালিয়াটির জমিদারদের দ্বারা নির্মিত এই প্রাসাদটি বাংলাদেশের অন্যতম বৃহত্তম জমিদার বাড়ি। এর বিশাল প্রবেশদ্বার ও স্তম্ভ প্রাচীন জাঁকজমকের পরিচয় দেয়।"
  },
  "Wari-Bateshwar": {
    "name": "ওয়ারী-বটেশ্বর",
    "description": "নরসিংদীতে অবস্থিত প্রায় আড়াই হাজার বছরের প্রাচীন এক প্রত্নতাত্ত্বিক খনি ও প্রাচীন বাণিজ্য বন্দর।",
    "fullHistory": "খ্রিস্টপূর্ব ৪৫০ অব্দের প্রাচীন সভ্যতার নানা নিদর্শন, মুদ্রা এবং পাথরের পুতি এখানে আবিষ্কৃত হয়েছে, যা প্রাচীন বাংলার সমৃদ্ধ বাণিজ্য ইতিহাসের সাক্ষ্য বহন করে।"
  },
  "Joydebpur Temple Areas": {
    "name": "জয়দেবপুর মন্দির এলাকা",
    "description": "জয়দেবপুরে অবস্থিত ঐতিহাসিক মন্দির এবং Hindus-দের তীর্থস্থান ও সাংস্কৃতিক উৎসবের কেন্দ্র।",
    "fullHistory": "জয়দেবপুরের রাজবাড়ির আশপাশে ছড়িয়ে থাকা এই প্রাচীন মন্দিরগুলোতে প্রতি বছর বিভিন্ন ধর্মীয় উৎসব ও পূজা অনুষ্ঠিত হয়।"
  },
  "Baba Loknath Temple": {
    "name": "بابা লোকনাথ মন্দির",
    "description": "বারদীতে অবস্থিত শ্রী শ্রী লোকনাথ ব্রহ্মচারীর প্রধান আশ্রম এবং একটি শান্ত আধ্যাত্মিক স্থান।",
    "fullHistory": "বিখ্যাত আধ্যাত্মিক সাধক বাবা লোকনাথের স্মরণে এই আশ্রমটি ভক্তদের ধ্যান ও প্রার্থনার জন্য অন্যতম প্রধান ধর্মীয় কেন্দ্র।"
  },
  "Nuhash Palli": {
    "name": "নুহাশ পল্লী",
    "description": "জনপ্রিয় কথাসাহিত্যিক হুমায়ূন আহমেদের তৈরি একটি মনোরম বাগানবাড়ি এবং শিল্প ও প্রাকৃতিক নন্দনকানন।",
    "fullHistory": "গাজীপুরে অবস্থিত এই বিশাল বাগানবাড়িতে হুমায়ূন আহমেদের সমাধি ছাড়াও রয়েছে নানা রকম ভাস্কর্য, ঔষধি বাগান এবং তার জনপ্রিয় নাটকের শুটিং স্পট।"
  },
  "Madhupur Forest Belt": {
    "name": "মধুপুর শালবন",
    "description": "টাঙ্গাইলের মধুপুরে অবস্থিত একটি বিশাল এবং মনোরম প্রাকৃতিক শালবন ও বন্যপ্রাণী অভয়ারণ্য।",
    "fullHistory": "বাংলাদেশের অন্যতম প্রাচীন ও প্রাকৃতিক বনভূমি এটি। এখানে শাল গাছের পাশাপাশি বিভিন্ন প্রজাতির পাখি, হরিণ ও বানরের দেখা মেলে।"
  },
  "Fantasy Kingdom": {
    "name": "ফ্যান্টাসি কিংডম",
    "description": "আশুলিয়ায় অবস্থিত আধুনিক বিনোদন পার্ক যা থ্রিল রাইড এবং ওয়াটার ওয়ার্ল্ডের জন্য জনপ্রিয়।",
    "fullHistory": "পরিবার নিয়ে সময় কাটানোর জন্য এটি ঢাকার অন্যতম প্রধান বিনোদন কেন্দ্র। এখানে বিভিন্ন ধরণের রাইড এবং চমৎকার কৃত্রিম হ্রদ রয়েছে।"
  },
  "National Parliament House": {
    "name": "জাতীয় সংসদ ভবন",
    "description": "লুই কানের ডিজাইন করা ঢাকার শেরেবাংলা নগরে অবস্থিত বাংলাদেশের দৃষ্টিনন্দন জাতীয় সংসদ ভবন।",
    "fullHistory": "বিংশ শতাব্দীর আধুনিক স্থাপত্যের এক শ্রেষ্ঠ নিদর্শন। এর জ্যামিতিক নকশা এবং চারপাশের কৃত্রিম হ্রদ এটিকে বিশ্বব্যাপী সমাদৃত করেছে।"
  },
  "Cox's Bazar Beach": {
    "name": "কক্সবাজার সমুদ্র সৈকত",
    "description": "বিশ্বের দীর্ঘতম অখণ্ড প্রাকৃতিক বালুকাময় সমুদ্র সৈকত, যা বাংলাদেশের প্রধান পর্যটন আকর্ষণ।",
    "fullHistory": "১২০ কিলোমিটার দীর্ঘ এই সৈকতটি কক্সবাজারে অবস্থিত। বঙ্গোপসাগরের নীল জলরাশি এবং সূর্যাস্তের অসাধারণ দৃশ্য উপভোগ করতে প্রতি বছর লাখ লাখ পর্যটক এখানে আসেন।"
  },
  "Sajek Valley": {
    "name": "সাজেক ভ্যালি",
    "description": "রাঙ্গামাটিতে অবস্থিত পাহাড়ের চূড়ায় মেঘ ও সবুজের অসাধারণ মিলনস্থল, যা 'মেঘের রাজ্য' নামে পরিচিত।",
    "fullHistory": "সমুদ্রপৃষ্ঠ থেকে প্রায় ১৮০০ ফুট উঁচুতে অবস্থিত সাজেক পাহাড়ের চূড়া থেকে মেঘের ভেলা ভেসে যাওয়ার দৃশ্য দেখা যায়। এর চারপাশের আদিবাসী পাড়াগুলো পাহাড়ি সংস্কৃতির সমৃদ্ধ রূপ প্রকাশ করে।"
  },
  "Bayazid Bostami Shrine": {
    "name": "বায়োজিদ বোস্তামী মাজার",
    "description": "চট্টগ্রামে অবস্থিত বিখ্যাত সুফি সাধক হযরত বায়েজিদ বোস্তামীর পবিত্র মাজার এবং ঐতিহাসিক কচ্ছপ দীঘি।",
    "fullHistory": "এখানে থাকা বিশাল আকৃতির কচ্ছপগুলো মাজারের অন্যতম প্রধান আকর্ষণ, যা ভক্তদের কাছে অত্যন্ত পবিত্র।"
  },
  "Mainamati": {
    "name": "ময়নামতি",
    "description": "কুমিল্লায় অবস্থিত প্রাচীন বৌদ্ধ সভ্যতার ঐতিহাসিক ধ্বংসাবশেষ ও প্রত্নতাত্ত্বিক স্থান।",
    "fullHistory": "অষ্টম থেকে দ্বাদশ শতাব্দীর শালবন বিহার এবং বিভিন্ন প্রাচীন স্তূপ এখানে রয়েছে, যা প্রাচীন বাংলার ইতিহাস ও ধর্মীয় সংস্কৃতির পরিচয় দেয়।"
  },
  "Shalban Vihara": {
    "name": "শালবন বিহার",
    "description": "ময়নামতির প্রত্নতাত্ত্বিক এলাকার কেন্দ্রস্থলে অবস্থিত একটি সুপ্রাচীন বৌদ্ধ বিহার।",
    "fullHistory": "দেব বংশের চতুর্থ রাজা শ্রী ভবদেব এটি নির্মাণ করেন। এর বিশাল লাল ইটের ধ্বংসাবশেষ এবং কেন্দ্রীয় মন্দির বৌদ্ধ সংস্কৃতির এক ঐতিহাসিক দলিল।"
  },
  "Local Zamindar Houses": {
    "name": "স্থানীয় জমিদার বাড়ি",
    "description": "বাংলাদেশের বিভিন্ন অঞ্চলে ছড়িয়ে থাকা প্রাচীন জমিদারদের বাসস্থান ও রাজকীয় প্রাসাদসমূহ।",
    "fullHistory": "জমিদারি প্রথার ঐতিহ্যবাহী এই প্রাসাদগুলো গ্রিক ও রোমান স্থাপত্যের সংমিশ্রণে তৈরি, যা তৎকালীন রাজকীয় শাসন ও সংস্কৃতির সাক্ষী।"
  },
  "Historical River Port Areas": {
    "name": "ঐতিহাসিক নদী বন্দর এলাকা",
    "description": "নদীমাতৃক বাংলাদেশের প্রাচীন নদী বন্দর ও নৌবাণিজ্য কেন্দ্রসমূহ।",
    "fullHistory": "Sadarghat এবং অন্যান্য নদী বন্দরগুলো সুদূর অতীত থেকে আজ পর্যন্ত আমাদের অর্থনীতি ও যাতায়াতের প্রধান লাইফলাইন হিসেবে কাজ করছে।"
  },
  "Foy’s Lake": {
    "name": "ফয়েজ লেক",
    "description": "চট্টগ্রামে সবুজ পাহাড়ে ঘেরা একটি সুন্দর হ্রদ এবং আধুনিক বিনোদন পার্ক।",
    "fullHistory": "১৯২৪ সালে রেলওয়ের ব্যবহারের জন্য এটি তৈরি করা হয়। পাহাড়ের কোল ঘেঁষে বয়ে চলা এই হ্রদের প্রাকৃতিক সৌন্দর্য এবং পার্ক পর্যটকদের বিনোদনের অন্যতম কেন্দ্র।"
  },
  "Kaptai River Ecosystem Edge": {
    "name": "কাপ্তাই নদীর পাড়",
    "description": "কাপ্তাই নদীর ধারের প্রাকৃতিক বনভূমি এবং মনোরম পাহাড়ি দৃশ্য।",
    "fullHistory": "নদীর শান্ত प्रवाह এবং চারপাশের পাহাড়ি পরিবেশ নিয়ে গঠিত এই বাস্তুতন্ত্র বন্যপ্রাণী ও প্রাকৃতিক সৌন্দর্যের এক অপূর্ব লীলাভূমি।"
  },
  "Khoiyachora Waterfall": {
    "name": "খৈয়াছড়া ঝরনা",
    "description": "মিরসরাইতে অবস্থিত বহু ধাপের একটি অসাধারণ প্রাকৃতিক পাহাড়ি ঝরনা।",
    "fullHistory": "এর অনন্য ৯টি ধাপ এবং ঘন জঙ্গলের মধ্য দিয়ে বয়ে চলা শীতল জলের প্রবাহ এটিকে ট্রেকার ও প্রকৃতিপ্রেমীদের অন্যতম পছন্দের স্থানে পরিণত করেছে।"
  },
  "Napittachora Waterfall": {
    "name": "নাপিত্তাছড়া ঝরনা",
    "description": "মিরসরাইয়ের আরেকটি পাহাড়ি ঝরনা ও প্রাকৃতিক ট্রেইল।",
    "fullHistory": "নাপিত্তাছড়া ট্রেইলে কুপিকাটা খুম, নাপিত্তাছড়া ও বাঘবিয়ানি ঝরনা অবস্থিত। পাহাড়ি ঝিরিপথ ও পাথর বেয়ে ট্র্যাকিং করার অভিজ্ঞতা এখানে পাওয়া যায়।"
  },
  "Kaptai Lake": {
    "name": "কাপ্তাই হ্রদ",
    "description": "রাঙ্গামাটিতে অবস্থিত দক্ষিণ এশিয়ার বৃহত্তম এবং অত্যন্ত মনোরম কৃত্রিম হ্রদ।",
    "fullHistory": "১৯৫৬ সালে বাঁধ নির্মাণের ফলে এই হ্রদটি তৈরি হয়। হ্রদের বুকে নৌকাভ্রমণ এবং চারপাশের পাহাড়ের সৌন্দর্য অত্যন্ত মনোমুগ্ধকর।"
  },
  "Shuvolong Waterfall": {
    "name": "শুভলং ঝরনা",
    "description": "কাপ্তাই হ্রদের পাশে অবস্থিত পাহাড় বেয়ে নেমে আসা একটি অত্যন্ত সুন্দর ঝরনা।",
    "fullHistory": "বর্ষাকালে এই ঝরনাটির জলপ্রবাহ পূর্ণ রূপ ধারণ করে। কাপ্তাই হ্রদে ট্রলারে চড়ে যাওয়ার সময় পাহাড়ের গা ঘেঁষে নেমে আসা এই ঝরনাটি দেখা যায়।"
  },
  "Nilgiri": {
    "name": "নীলগিরি",
    "description": "বান্দরবানের অন্যতম পাহাড়ি পর্যটন কেন্দ্র যা মেঘ ও পাহাড়ের অপূর্ব মিলনের জন্য বিখ্যাত।",
    "fullHistory": "সমুদ্রপৃষ্ঠ থেকে প্রায় ২২০০ ফুট উঁচুতে অবস্থিত এই এলাকাটি থেকে চারপাশের সবুজ পাহাড় এবং মেঘের সমুদ্রের অসাধারণ ভিউ পাওয়া যায়।"
  },
  "Nilachal": {
    "name": "নীলাচল",
    "description": "বান্দরবান শহরের কাছে অবস্থিত একটি পাহাড়ের চূড়া যেখান থেকে সূর্যাস্ত এবং শহরের দৃশ্য সুন্দর দেখায়।",
    "fullHistory": "বান্দরবান শহর থেকে ৫ কিমি দূরে অবস্থিত এই শৈল শহর থেকে পাহাড়ের ভাজে ভাজে মেঘের ওড়াউড়ি এবং সাঙ্গু নদীর প্রবাহ স্পষ্ট দেখা যায়।"
  },
  "Keokradong": {
    "name": "কেওক্রাডং",
    "description": "বান্দরবানে অবস্থিত বাংলাদেশের অন্যতম সর্বোচ্চ এবং বিখ্যাত পাহাড়ি শৃঙ্গ যা অ্যাডভেঞ্চারপ্রেমীদের জন্য আদর্শ।",
    "fullHistory": "সমুদ্রপৃষ্ঠ থেকে ৩২৩৫ ফুট উঁচুতে অবস্থিত এই পর্বতশৃঙ্গে পৌঁছানোর ট্র্যাকিং ট্রেইলটি অত্যন্ত রোমাঞ্চকর এবং চারপাশের পাহাড়ি প্রকৃতি অতুলনীয়।"
  },
  "Tazing Dong": {
    "name": "তাজিং ডং",
    "description": "বান্দরবানের রুমা উপজেলায় অবস্থিত অন্যতম সর্বোচ্চ পর্বত শৃঙ্গ যা 'বিজয়' নামেও পরিচিত।",
    "fullHistory": "এটি বাংলাদেশের একটি অন্যতম উঁচু পর্বতশৃঙ্গ। এর দুর্গম পাহাড়ি পথ এবং চারপাশের বুনো পাহাড়ি সৌন্দর্য ট্র্যাকারদের কাছে অত্যন্ত আকর্ষণীয়।"
  },
  "Boga Lake": {
    "name": "বগা লেক",
    "description": "বান্দরবানের কেওক্রাডংয়ের পথে অবস্থিত পাহাড়ের চূড়ায় এক প্রাকৃতিক ও রহস্যময় নীল জলের হ্রদ।",
    "fullHistory": "সমুদ্রপৃষ্ঠ থেকে প্রায় ১২৫০ ফুট উঁচুতে অবস্থিত এই হ্রদটি মূলত মৃত আগ্নেয়গিরির জ্বালামুখ বা ভূগর্ভস্থ পরিবর্তনের ফলে সৃষ্ট বলে মনে করা হয়।"
  },
  "Thanchi": {
    "name": "থানচি",
    "description": "সাঙ্গু নদীর তীরে অবস্থিত বান্দরবানের একটি অত্যন্ত সুন্দর এবং পাহাড়ি অঞ্চল।",
    "fullHistory": "থানচি থেকে সাঙ্গু নদী দিয়ে তিন্দু ও রেমাক্রির দিকে যাওয়ার নৌকাভ্রমণটিকে বাংলাদেশের অন্যতম সুন্দর নদীপথের অভিজ্ঞতা বলা হয়।"
  },
  "Ruma": {
    "name": "রুমা",
    "description": "বান্দরবানের একটি পাহাড়ি অঞ্চল যা কেওক্রাডং ও বগা লেকের প্রবেশদ্বার হিসেবে পরিচিত।",
    "fullHistory": "পাহাড়ি ট্র্যাকিংয়ের জন্য বিখ্যাত রুমা অত্যন্ত বৈচিত্র্যময় পাহাড়ি নৃগোষ্ঠী ও প্রাকৃতিক সৌন্দর্যে ভরপুর।"
  },
  "Hanging Bridge": {
    "name": "ঝুলন্ত ব্রিজ",
    "description": "রাঙ্গামাটির কাপ্তাই হ্রদের উপর অবস্থিত শহরের প্রধান প্রতীকী ঝুলন্ত সেতু।",
    "fullHistory": "হ্রদের দুটি পাহাড়ের সংযোগকারী ৩৩৫ ফুট দীর্ঘ এই ঝুলন্ত সেতুটি পর্যটকদের ছবি তোলার অন্যতম প্রধান আকর্ষণ।"
  },
  "Alutila Cave": {
    "name": "আলুটিলা গুহা",
    "description": "খাগড়াছড়ির আলুটিলা পাহাড়ে অবস্থিত একটি অন্ধকার এবং রোমাঞ্চকর প্রাকৃতিক পাথুরে সুড়ঙ্গ।",
    "fullHistory": "প্রায় ২৮২ ফুট দীর্ঘ এই প্রাকৃতিক গুহার ভেতর দিয়ে একটি শীতল পাহাড়ি ঝিরি বয়ে চলেছে। মশাল জ্বালিয়ে এই সুড়ঙ্গ পার হওয়া অত্যন্ত রোমাঞ্চকর।"
  },
  "Richang Waterfall": {
    "name": "রিছাং ঝরনা",
    "description": "খাগড়াছড়িতে অবস্থিত পাহাড়ের ঢাল বেয়ে পাথুরে পিচ্ছিল পথে নেমে আসা একটি প্রাকৃতিক ঝরনা।",
    "fullHistory": "আলুটিলা গুহার কাছাকাছি অবস্থিত এই ঝরনাটির শান্ত শীতল পানি এবং চারপাশের বুনো পরিবেশ পর্যটকদের দারুণ আনন্দ দেয়।"
  },
  "Inani Beach": {
    "name": "ইনানী সৈকত",
    "description": "কক্সবাজারের উখিয়ায় অবস্থিত প্রবাল পাথর বেষ্টিত একটি অতি মনোরম ও শান্ত পাথুরে সৈকত।",
    "fullHistory": "মেরিন ড্রাইভের পাশে অবস্থিত এই সৈকতটি প্রবাল পাথরের জন্য বিখ্যাত। ভাটার সময় যখন পাথরগুলো ভেসে ওঠে, তখন এখানে এক অপূর্ব রূপের সৃষ্টি হয়।"
  },
  "Laboni Beach": {
    "name": "লাবণী সৈকত",
    "description": "কক্সবাজারের মূল এবং সবচেয়ে জনপ্রিয় ও প্রাণবন্ত সমুদ্র সৈকত।",
    "fullHistory": "শহরের সবচেয়ে কাছে হওয়ায় এখানে পর্যটকদের সমাগম সবচেয়ে বেশি থাকে। সৈকতে বিভিন্ন বিনোদনমূলক খেলাধুলা এবং ঝিনুকের পণ্যের দোকান রয়েছে।"
  },
  "Himchari": {
    "name": "হিমছড়ি",
    "description": "কক্সবাজার মেরিন ড্রাইভের পাশে অবস্থিত একটি পাহাড়ি জাতীয় উদ্যান ও শীতল পানির প্রাকৃতিক ঝরনা।",
    "fullHistory": "পাহাড়ের চূড়া থেকে বঙ্গোপসাগরের নীল জলরাশির দৃশ্য এবং চারপাশের চিরসবুজ বনাঞ্চল পর্যটকদের মুগ্ধ করে।"
  },
  "Saint Martin’s Island": {
    "name": "সেন্ট মার্টিন দ্বীপ",
    "description": "বাংলাদেশের একমাত্র প্রবাল দ্বীপ যা বঙ্গোপসাগরের বুকে নারকেল জিঞ্জিরা নামে পরিচিত।",
    "fullHistory": "নীল জলরাশি, বালুকাময় সৈকত এবং প্রবালের প্রাচীর ঘেরা এই দ্বীপটি বাংলাদেশের পর্যটকদের অন্যতম প্রিয় স্বর্গরাজ্য।"
  },
  "Sonadia Island": {
    "name": "সোনাদিয়া দ্বীপ",
    "description": "মহেশখালীতে অবস্থিত লাল কাঁকড়া এবং পরিযায়ী পাখির এক শান্ত ও সুন্দর দ্বীপ।",
    "fullHistory": "লাল কাঁকড়ার বিচরণক্ষেত্র এবং শীতকালে অতিথি পাখিদের অভয়ারণ্য হিসেবে এই নিরিবিলি দ্বীপটি অত্যন্ত দর্শনীয়।"
  },
  "Moheshkhali Island": {
    "name": "মহেশখালী দ্বীপ",
    "description": "চট্টগ্রামের উপকূলে অবস্থিত পাহাড় ও হিন্দু-বৌদ্ধ মন্দিরে ঘেরা একটি ঐতিহাসিক পাহাড়ি দ্বীপ।",
    "fullHistory": "পাহাড়ের চূড়ায় অবস্থিত বিখ্যাত আদিনাথ মন্দির এবং রাখাইন সম্প্রদায়ের স্বর্ণ মন্দির এই দ্বীপের প্রধান আকর্ষণ।"
  },
  "Chera Dwip": {
    "name": "ছেঁড়া দ্বীপ",
    "description": "সেন্ট মার্টিনের দক্ষিণে অবস্থিত জোয়ার-ভাটায় বিচ্ছিন্ন হওয়া চমৎকার একটি প্রবাল দ্বীপখণ্ড।",
    "fullHistory": "এখানে জীবন্ত প্রবাল এবং প্রবাল পাথরের অপরূপ রূপ দেখা যায়। এটি সেন্ট মার্টিনের চেয়েও শান্ত ও স্বচ্ছ পানির জন্য পরিচিত।"
  },
  "Patenga Beach": {
    "name": "পতেঙ্গা সৈকত",
    "description": "চট্টগ্রাম শহরের কাছে কর্ণফুলী নদী ও সাগরের মোহনায় অবস্থিত জনপ্রিয় সৈকত।",
    "fullHistory": "সাগরের বুক চিরে জেগে ওঠা পাথর এবং চমৎকার সান্ধ্যকালীন হাওয়া উপভোগ করতে চট্টগ্রামের মানুষ ও পর্যটকরা এখানে আসেন।"
  },
  "Parki Beach": {
    "name": "পারকি সৈকত",
    "description": "চট্টগ্রামের আনোয়ারায় অবস্থিত ঝাউবনে ঘেরা একটি সুন্দর ও শান্ত সমুদ্র সৈকত।",
    "fullHistory": "সৈকত ঘেঁষে থাকা বিশাল ঝাউবন এবং শান্ত বালুময় সৈকত একে পিকনিক ও নিরিবিলি সময় কাটানোর জন্য আদর্শ করে তুলেছে।"
  },
  "Nijhum Dwip": {
    "name": "নিঝুম দ্বীপ",
    "description": "নোয়াখালীর হাতিয়ায় অবস্থিত চিত্রা হরিণ ও পরিযায়ী পাখির এক অসাধারণ শান্ত দ্বীপ ও বনাঞ্চল।",
    "fullHistory": "শীতকালে হাজার হাজার অতিথি পাখির কিচিরমিচির এবং ম্যানগ্রোভ বনে চিত্রা হরিণের পাল ঘুরে বেড়ানোর দৃশ্য এ দ্বীপকে এক মায়াবী রূপ দেয়।"
  },
  "Mahasthangarh": {
    "name": "মহাস্থানগড়",
    "description": "বগুড়ায় অবস্থিত বাংলাদেশের প্রাচীনতম দুর্গ-নগরী এবং পুণ্ড্রবর্ধনের ঐতিহাসিক রাজধানী।",
    "fullHistory": "খ্রিস্টপূর্ব তৃতীয় শতাব্দীর এই নগরীটি আমাদের প্রাচীন ইতিহাসের এক সমৃদ্ধ ভাণ্ডার। করাতোয়া নদীর তীরে অবস্থিত দুর্গ ও এর ধ্বংসাবশেষ অত্যন্ত চিত্তাকর্ষক।"
  },
  "Somapura Mahavihara": {
    "name": "সোমপুর মহাবিহার",
    "description": "নওগাঁর পাহাড়পুরে অবস্থিত ইউনেস্কো বিশ্ব ঐতিহ্যবাহী সুপ্রাচীন বৌদ্ধ বিহার।",
    "fullHistory": "অষ্টম শতকে পাল রাজবংশের দ্বিতীয় রাজা ধর্মপাল এটি নির্মাণ করেন। এটি তৎকালীন এশিয়ার অন্যতম বৃহত্তম শিক্ষা ও সাংস্কৃতিক কেন্দ্র ছিল।"
  },
  "Puthia Rajbari": {
    "name": "পুঠিয়া রাজবাড়ী",
    "description": "রাজশাহীতে অবস্থিত টেরাকোটা মন্দিরের জন্য বিখ্যাত চমৎকার এক জমিদার রাজপ্রাসাদ।",
    "fullHistory": "এখানে পঞ্চরত্ন গোবিন্দ মন্দির, শিব মন্দির ও দোলমঞ্চ রয়েছে, যা বাংলার স্থাপত্য ও ভাস্কর্যের অনন্য নিদর্শন।"
  },
  "Natore Rajbari": {
    "name": "নাঠোর রাজবাড়ী",
    "description": "নাটোরে অবস্থিত রানী ভবানীর ঐতিহাসিক রাজপ্রাসাদ ও দিঘি পরিবেষ্টিত রাজকীয় কমপ্লেক্স।",
    "fullHistory": "রানী ভবানীর এই প্রাসাদটি দীঘি ও সবুজে ঘেরা এক শান্ত ঐতিহাসিক স্থান।"
  },
  "Padma River Bank": {
    "name": "পদ্মা নদীর পাড়",
    "description": "রাজশাহী শহরের পাশ দিয়ে বয়ে চলা সুবিশাল পদ্মা নদীর তীরে অবস্থিত মনোরম পার্ক।",
    "fullHistory": "বিকালে পদ্মা নদীর মৃদু হাওয়া ও চমৎকার সূর্যাস্ত উপভোগ করতে রাজশাহীর মানুষ লালনশাহ পার্ক ও টি-বাঁধ এলাকায় ভিড় জমান।"
  },
  "Local Wetlands": {
    "name": "স্থানীয় বিল অঞ্চল",
    "description": "রাজশাহী ও চলনবিল অঞ্চলের সুবিশাল মিঠা পানির জলাভূমি ও প্রাকৃতিক মৎস্য ভাণ্ডার।",
    "fullHistory": "বর্ষাকালে বিলের অথৈ পানি এবং শীতকালে অতিথি পাখির আগমন এই জলাভূমিগুলোকে এক চোখ জুড়ানো রূপ দেয়।"
  },
  "Mango Orchard Tourism": {
    "name": "আম বাগান পর্যটন",
    "description": "রাজশাহী ও চাঁপাইনবাবগঞ্জের বিশাল আমের বাগান এবং গ্রীষ্মকালীন আম উৎসব।",
    "fullHistory": "গ্রীষ্মকালে গাছভর্তি সুস্বাদু আমের সমারোহ দেখতে এবং তাজা আম কিনতে পর্যটকরা এই অঞ্চলে আসেন।"
  },
  "Sixty Dome Mosque": {
    "name": "ষাট গম্বুজ মসজিদ",
    "description": "বাগেরহাটে অবস্থিত ইউনেস্কো বিশ্ব ঐতিহ্যবাহী ১৫ শতকের সুপ্রসিদ্ধ ও দৃষ্টিনন্দন মসজিদ।",
    "fullHistory": "১৫ শতকে সুফি সাধক খান জাহান আলী এটি নির্মাণ করেন। এর ৮১টি গম্বুজ এবং পোড়ামাটির অলংকরণ মধ্যযুগীয় ইসলামিক স্থাপত্যের এক অনন্য কীর্তি।"
  },
  "Liberation War Museum": {
    "name": "মুক্তিযুদ্ধ জাদুঘর",
    "description": "খুলনায় অবস্থিত ১৯৭১ সালের মহান যুদ্ধের গৌরবোজ্জ্বল ইতিহাস ও স্মৃতি সংবলিত জাদুঘর।",
    "fullHistory": "মুক্তিযোদ্ধাদের বীরত্বগাথা ও পাক হানাদার বাহিনীর অত্যাচারের ঐতিহাসিক তথ্য ও প্রমাণাদি এই জাদুঘরে সংরক্ষিত রয়েছে।"
  },
  "Sundarbans": {
    "name": "সুন্দরবন",
    "description": "বিশ্বের বৃহত্তম ম্যানগ্রোভ বন এবং রয়েল বেঙ্গল টাইগারের বিশ্বখ্যাত প্রাকৃতিক আবাসস্থল।",
    "fullHistory": "ইউনেস্কো বিশ্ব ঐতিহ্যবাহী এই বনটি গঙ্গা-ব্রহ্মপুত্র নদীর মোহনায় অবস্থিত। এখানে সুন্দরী গেওয়াসহ নানা উদ্ভিদ এবং বাঘ, হরিণ ও কুমিরের দেখা মেলে।"
  },
  "Mangrove Ecosystem Zones": {
    "name": "ম্যানগ্রোভ ইকোসিস্টেম জোন",
    "description": "সুন্দরবনের শ্বাসমূলীয় বনাঞ্চলের নদীনালা এবং সমৃদ্ধ সামুদ্রিক ও জলজ পরিবেশ।",
    "fullHistory": "জোয়ার-ভাটায় প্লাবিত এই বনের কর্দমাক্ত মাটি ও শ্বাসমূল উদ্ভিদকুল উপকূলীয় অঞ্চলের প্রাকৃতিক ঢাল হিসেবে কাজ করে।"
  },
  "Dublar Char": {
    "name": "দুবলার চর",
    "description": "সুন্দরবনের দক্ষিণে অবস্থিত শুঁটকি পল্লী এবং কুটির শিল্পের জন্য বিখ্যাত একটি দ্বীপ।",
    "fullHistory": "শহরের যান্ত্রিকতা থেকে দূরে শীতকালে এখানে জেলেদের অস্থায়ী বসতি গড়ে ওঠে এবং রাস উৎসব উপলক্ষে দেশ-বিদেশ থেকে হাজার হাজার ভক্ত জড়ো হন।"
  },
  "Kuakata Sea Beach": {
    "name": "কুয়াকাটা সমুদ্র সৈকত",
    "description": "পটুয়াখালীতে অবস্থিত অসাধারণ সমুদ্র সৈকত যেখান থেকে সূর্যোদয় ও সূর্যাস্ত উভয়ই দেখা যায়।",
    "fullHistory": "এটি 'সাগর কন্যা' নামে পরিচিত। সৈকতের শান্ত পরিবেশ এবং একই স্থান থেকে সূর্যোদয় ও সূর্যাস্ত দেখার সুযোগ পর্যটকদের আকর্ষণ করে।"
  },
  "Manpura Island": {
    "name": "মনপুরা দ্বীপ",
    "description": "ভোলায় অবস্থিত নদী ও সাগরের মোহনায় এক নিরিবিলি, প্রাকৃতিকভাবে সুন্দর ও শান্ত দ্বীপ।",
    "fullHistory": "মনপুরের বিস্তীর্ণ মেঘনা নদীর রূপ, হরিণ ও নারকেল বাগান একে কোলাহলমুক্ত অবকাশ যাপনের আদর্শ স্থানে পরিণত করেছে।"
  },
  "Meghna Estuary Views": {
    "name": "মেঘনা মোহনার দৃশ্য",
    "description": "মেঘনা নদী বঙ্গোপসাগরে পতনের মোহনার সুবিশাল জলরাশি ও দিগন্ত বিস্তৃত ল্যান্ডস্কেপ।",
    "fullHistory": "এখানে নদীর বিশালতা এবং আকাশের নীল মিলেমিশে একাকার হয়ে যায়। ট্রলারে চড়ে মোহনা ঘুরে দেখার অনুভূতি দারুণ।"
  },
  "Riverfront Tourism": {
    "name": "নদীর পারের পর্যটন",
    "description": "বরিশালের কির্তনখোলা নদী এবং নদীমাতৃক বাংলার মনোরম প্রাকৃতিক সৌন্দর্য।",
    "fullHistory": "কীর্তনখোলার শান্ত প্রবাহ এবং বরিশাল ঘাটের লঞ্চ ও জলযানের ব্যস্ততা নদীমাতৃক বাংলার আবহমান রূপকে ফুটিয়ে তোলে।"
  },
  "Floating Market Areas": {
    "name": "ভাসমান হাট এলাকা",
    "description": "বরিশালের ঝালকাঠি ও বানারীপাড়ার খালের উপর ঐতিহ্যবাহী ভাসমান পেয়ারা ও শাকসবজির বাজার।",
    "fullHistory": "খালের মধ্যে শত শত নৌকায় পেয়ারা বিক্রির এই দৃশ্যটি অত্যন্ত আকর্ষণীয়, যা পর্যটকদের কাছে 'বাংলার ভেনিস' হিসেবে সমাদৃত।"
  },
  "Shahjalal Mazar": {
    "name": "শাহজালাল মাজার",
    "description": "সিলেটে অবস্থিত বিখ্যাত সুফি সাধক হযরত শাহজালাল (র.)-এর অত্যন্ত পবিত্র ও ঐতিহাসিক মাজার শরিফ।",
    "fullHistory": "১৪ শতকে সিলেটে ইসলাম প্রচারকারী এই মহান সাধকের মাজার দেখতে প্রতিদিন হাজার হাজার ধর্মপ্রাণ মানুষ সিলেটে আসেন। মাজারের গজার মাছ ও কবুতর অন্যতম আকর্ষণ।"
  },
  "Shah Paran Mazar": {
    "name": "শাহ পরাণ মাজার",
    "description": "সিলেটে অবস্থিত হযরত শাহজালালের ভাগ্নে হযরত শাহ পরাণ (র.)-এর পবিত্র মাজার শরিফ।",
    "fullHistory": "সিলেটের ধর্মীয় ঐতিহ্যের আরেকটি প্রধান স্থান। এর শান্ত ও ভক্তিপূর্ণ পরিবেশ দেশজুড়ে পরিচিত।"
  },
  "Tea Garden Heritage Zones": {
    "name": "চা বাগান ঐতিহ্য অঞ্চল",
    "description": "শ্রীমঙ্গল ও সিলেটের মাইলের পর মাইল বিস্তৃত সবুজের চাদর বিছানো মনোরম চা বাগানসমূহ।",
    "fullHistory": "সবুজ পাহাড়ের ঢাল বেয়ে গড়ে ওঠা এই বাগানগুলো আমাদের চা শিল্পের প্রধান উৎস। এখানকার সাত রঙের চা বিশ্বখ্যাত।"
  },
  "Ratargul Swamp Forest": {
    "name": "রাতারগুল সোয়াম্প ফরেস্ট",
    "description": "সিলেটের গোয়াইনঘাটে অবস্থিত বাংলাদেশের একমাত্র চিরসবুজ মিঠা পানির ভাসমান জঙ্গল বা জলাবন।",
    "fullHistory": "বর্ষাকালে এই বনটি পানিতে নিমজ্জিত থাকে। নৌকায় করে বনের গাছের ডালপালার মধ্য দিয়ে ঘুরে বেড়ানো এক অসাধারণ অভিজ্ঞতা।"
  },
  "Jaflong": {
    "name": "জাফলং",
    "description": "ভারতের সীমান্ত ঘেঁষে অবস্থিত খাসিয়া পাহাড়ের পাদদেশের চমৎকার নদী ও পাথর সংগ্রহের দৃশ্য।",
    "fullHistory": "পিয়াইন নদীর স্বচ্ছ জল ও পাথর উত্তোলন এবং ওপারের পাহাড় থেকে নেমে আসা ঝরনার দৃশ্য একে সিলেটের অন্যতম প্রধান আকর্ষণ বানিয়েছে।"
  },
  "Lalakhal": {
    "name": "লালাখাল",
    "description": "জৈন্তাপুরে অবস্থিত পান্না সবুজ রঙের পানির জন্য বিখ্যাত একটি অতি মনোরম পাহাড়ি নদী।",
    "fullHistory": "ভারতের চেরাপুঞ্জি পাহাড় থেকে নেমে আসা এই নদীর পানির সবুজ নীল রঙ পর্যটকদের নৌকাভ্রমণের চমৎকার অনুভূতি দেয়।"
  },
  "Lawachara National Park": {
    "name": "লাউয়াছড়া জাতীয় উদ্যান",
    "description": "শ্রীমঙ্গলে অবস্থিত চিরসবুজ বৃষ্টি অরণ্য যা বিভিন্ন বিরল প্রজাতির বন্যপ্রাণী ও পাখির জন্য পরিচিত।",
    "fullHistory": "এটি বাংলাদেশের অন্যতম প্রধান রেইন ফরেস্ট। এখানে উল্লুক, হনুমান, চশমাপরা বানর এবং শত শত প্রজাতির পরিযায়ী পাখি বাস করে।"
  },
  "Ham Ham Waterfall": {
    "name": "হাম হাম ঝরনা",
    "description": "মৌলভীবাজারের রাজকান্দি বনে অবস্থিত অত্যন্ত রোমাঞ্চকর এবং গভীর জঙ্গলের ভেতরের ঝরনা।",
    "fullHistory": "কয়েক ঘণ্টার দুর্গম জঙ্গল ও ঝিরিপথ ট্র্যাকিং করে এই বিশাল প্রাকৃতিক ঝরনায় পৌঁছানো যায়, যা ট্রেকারদের কাছে অত্যন্ত রোমাঞ্চকর।"
  },
  "Madhabpur Lake": {
    "name": "মাধবপুর লেক",
    "description": "শ্রীমঙ্গলের চা বাগানের পাহাড়গুলোর মাঝে অবস্থিত বেগুনী পদ্মফুলে ভরা এক সুন্দর প্রাকৃতিক হ্রদ।",
    "fullHistory": "সবুজ চা বাগান পরিবেষ্টিত এই হ্রদের শান্ত পানি এবং পদ্মফুল পর্যটকদের মুগ্ধ করে।"
  },
  "Panchagarh Tea Gardens": {
    "name": "পঞ্চগড় চা বাগান",
    "description": "উত্তরের পাহাড়ি ঢালে অবস্থিত চা বাগান, যেখানে শীতল হাওয়া ও সুন্দর বাগান দেখা যায়।",
    "fullHistory": "পঞ্চগড়ে সমতল ভূমিতে চা চাষের মাধ্যমে পঞ্চগড় আজ দেশের দ্বিতীয় বৃহত্তম চা উৎপাদনকারী অঞ্চলে পরিণত হয়েছে।"
  },
  "Teesta Barrage": {
    "name": "তিস্তা ব্যারেজ",
    "description": "লালমনিরহাটে তিস্তা নদীর উপর অবস্থিত বৃহত্তম সেচ প্রকল্প ও পর্যটন কেন্দ্র।",
    "fullHistory": "১৯৯০ সালে চালু হওয়া এই বিশাল বাঁধ ও জলকপাট এলাকাটি নদীর দিগন্ত বিস্তৃত নীল জল ও চরের সৌন্দর্যের জন্য দর্শনীয়।"
  },
  "Teesta River Viewpoint": {
    "name": "তিস্তা নদী ভিউপয়েন্ট",
    "description": "তিস্তা নদীর পাড়ের চমৎকার নদী ল্যান্ডস্কেপ ও চর অঞ্চলের সূর্যাস্ত ভিউ।",
    "fullHistory": "তিস্তা নদীর শান্ত প্রবাহ এবং নদীর চরে কাশফুলের সমারোহ প্রকৃতিপ্রেমীদের খুব প্রিয়।"
  },
  "Chikli Water Reservoir": {
    "name": "চিকলী ওয়াটার পার্ক",
    "description": "রংপুর শহরে অবস্থিত একটি সুন্দর হ্রদ ও বিনোদন কেন্দ্র।",
    "fullHistory": "রংপুর শহরের বাসিন্দাদের বিকেল কাটানোর প্রধান বিনোদন কেন্দ্র এটি। এখানে স্পীডবোট ও রাইডের সুবিধা রয়েছে।"
  },
  "Ghughudanga Wetlands": {
    "name": "ঘুগুডাঙ্গা বিল",
    "description": "দিনাজপুরে অবস্থিত পরিযায়ী পাখি সমৃদ্ধ জলাভূমি।",
    "fullHistory": "শীতকালে এই বিলের বিশাল জলরাশিতে হাজার হাজার বুনো হাস ও পাখির মেলা বসে।"
  },
  "Char River Islands": {
    "name": "নদীর চর অঞ্চল",
    "description": "তিস্তা ও ব্রহ্মপুত্রের বুকে জেগে ওঠা পলিমাটির শান্ত চর ও গ্রামীণ জীবনযাত্রা।",
    "fullHistory": "চরের সাধারণ জীবনযাত্রা, তরমুজ ও ফসলের ক্ষেত এবং নদীর বিশালতা এক গ্রামীণ শান্ত রূপ তুলে ধরে।"
  },
  "Dinajpur Eco Areas": {
    "name": "দিনাজপুর ইকো পার্ক",
    "description": "দিনাজপুরের শালবন ও প্রাকৃতিক পরিবেশ ঘেরা বন্যপ্রাণী পার্ক।",
    "fullHistory": "বনাঞ্চল ও প্রাকৃতিক পরিবেশকে সুরক্ষিত রাখতে এখানে ইকো ট্যুরিজম গড়ে তোলা হয়েছে।"
  },
  "Thakurgaon Green Fields": {
    "name": "Thakurgaon Green Fields",
    "description": "Thakurgaon-এর বিস্তীর্ণ ফসলের সবুজ মাঠ এবং শান্ত গ্রামীণ ল্যান্ডস্কেপ।",
    "fullHistory": "উত্তরের শান্ত গ্রামীণ সৌন্দর্য এবং দিগন্ত বিস্তৃত ফসলের মাঠ শহুরে ক্লান্তি দূর করতে দারুণ।"
  },
  "Nilphamari Nature Parks": {
    "name": "নীলফামারী নেচার পার্ক",
    "description": "নীলফামারীর বিভিন্ন ছোট-বড় হ্রদ ও উদ্যান ঘেরা পরিবেশ বান্ধব পার্ক।",
    "fullHistory": "শান্ত পরিবেশ এবং সবুজের সমারোহ নিয়ে এই পার্কগুলো গড়ে তোলা হয়েছে।"
  },
  "Rangpur Riverfront": {
    "name": "রংপুর রিভারফ্রন্ট",
    "description": "রংপুরের ঘাঘট ও তিস্তা নদীর পাড়ের মনোরম প্রাকৃতিক হাওয়া ও বসার পার্ক।",
    "fullHistory": "নদীর পাড়ে সুন্দর বসার স্থান ও সূর্যাস্ত দেখার জন্য এটি স্থানীয়দের খুব পছন্দের।"
  },
  "Karatoa River Area": {
    "name": "করতোয়া নদী অঞ্চল",
    "description": "ঐতিহাসিক করতোয়া নদীর পাড়ের প্রাকৃতিক চিরসবুজ প্রকৃতি।",
    "fullHistory": "মহাস্থানগড়ের পাশ দিয়ে বয়ে চলা করতোয়া নদীর ইতিহাস আমাদের প্রাচীন সভ্যতার সাথে জড়িত।"
  },
  "Atrai River Area": {
    "name": "আত্রাই নদী অঞ্চল",
    "description": "দিনাজপুরের আত্রাই নদীর তীরবর্তী শান্ত রূপ এবং গ্রামীণ পরিবেশ।",
    "fullHistory": "নদীর ধারের কাশবন ও জেলেদের মাছ ধরার দৃশ্য বাংলার চিরন্তন রূপ প্রকাশ করে।"
  },
  "Rural Landscape Tourism": {
    "name": "Rural Landscape Tourism",
    "description": "উত্তরবঙ্গের আবহমান সবুজ গ্রাম এবং মাটির ঘরের শান্ত গ্রামীণ ঐতিহ্য।",
    "fullHistory": "মাটির দোতলা ঘর ও সবুজ বাঁশঝাড় বেষ্টিত উত্তরের গ্রামগুলোর শান্ত প্রকৃতি পর্যটকদের আকৃষ্ট করে।"
  },
  "Panchagarh Himalayan View Point": {
    "name": "Panchagarh Himalayan View Point",
    "description": "Panchagarh থেকে শীতকালে আকাশে ভেসে ওঠা কাঞ্চনজঙ্ঘা পর্বত শৃঙ্গের অবিশ্বাস্য দৃশ্য।",
    "fullHistory": "شীতকালে মেঘমুক্ত আকাশে কাঞ্চনজঙ্ঘার বরফাবৃত চূড়া পঞ্চগড়ের বিভিন্ন স্থান থেকে স্পষ্ট দেখা যায়, যা এক জাদুকরী দৃশ্য।"
  },
  "Banglabandha Zero Point View Area": {
    "name": "বাংলাবান্ধা জিরো পয়েন্ট",
    "description": "বাংলাদেশ ও ভারতের জিরো পয়েন্ট সীমান্ত সংযোগ স্থল।",
    "fullHistory": "বাংলাদেশের সর্বউত্তরের সীমান্ত জিরো পয়েন্ট এটি। এখান থেকে ভারতের কাঞ্চনজঙ্ঘা পাহাড় ও জিরো পয়েন্ট কাছাকাছি দেখা যায়।"
  },
  "Shashi Lodge": {
    "name": "শশী লজ",
    "description": "ময়মনসিংহ শহরে অবস্থিত চমৎকার ইউরোপীয় স্থাপত্যের এক জমিদার রাজপ্রাসাদ।",
    "fullHistory": "১৯ শতকে মুক্তাগাছার জমিদার সূর্যকান্ত আচার্য চৌধুরী এটি নির্মাণ করেন। এর সামনের চমৎকার বাগান ও ফোয়ারা এবং ইউরোপীয় আসবাবপত্র বেশ দৃষ্টিনন্দন।"
  },
  "Alexander Castle": {
    "name": "আলেকজান্ডার ক্যাসেল",
    "description": "ময়মনসিংহে অবস্থিত লোহার তৈরি ঐতিহাসিক লোহা কুঠির বা গ্রিক স্থাপত্যের দুর্গ।",
    "fullHistory": "১৮৭৯ সালে রাজা সূর্যকান্ত আচার্য চৌধুরী এটি নির্মাণ করেন। রবীন্দ্রনাথ ঠাকুর ও লর্ড কার্জনসহ অনেক বিখ্যাত ব্যক্তি এখানে অবস্থান করেছেন।"
  },
  "Bangladesh Agricultural University Museum": {
    "name": "কৃষি বিশ্ববিদ্যালয় মিউজিয়াম",
    "description": "ময়মনসিংহে অবস্থিত দেশের বৃহত্তম কৃষি শিক্ষা ও গবেষণামূলক উন্মুক্ত জাদুঘর।",
    "fullHistory": "ব্রহ্মপুত্র নদের তীরে অবস্থিত এই বিশাল ক্যাম্পাসটি সবুজে ঘেরা। এর ভেতরের কৃষি মিউজিয়াম এবং আম ও লিচু বাগান দেখার মতো।"
  },
  "Susang Durgapur Rajbari": {
    "name": "সুসং দুর্গাপুর রাজবাড়ী",
    "description": "নেত্রকোণায় অবস্থিত সুসং রাজপরিবারের ঐতিহাসিক রাজপ্রাসাদের ধ্বংসাবশেষ।",
    "fullHistory": "প্রাচীন সুসং রাজ্যের রাজাদের এই প্রশাসনিক কেন্দ্রটি গারো পাহাড়ের পাদদেশে অবস্থিত এক ঐতিহাসিক স্থান।"
  },
  "Tonk Movement Memorial": {
    "name": "টঙ্ক আন্দোলন স্মৃতিস্তম্ভ",
    "description": "টঙ্ক আন্দোলনের শহীদ হাজং মাতা রাশিমণির স্মরণে নির্মিত স্মৃতিস্তম্ভ।",
    "fullHistory": "টঙ্ক বা ধান-কর প্রথার বিরুদ্ধে রক্তক্ষয়ী আন্দোলনের ঐতিহাসিক স্মৃতি বহন করে এই স্মৃতিস্তম্ভ।"
  },
  "Hazrat Shah Kamal Shrine": {
    "name": "হযরত শাহ কামাল মাজার",
    "description": "নেত্রকোণায় অবস্থিত হযরত শাহ কামালের পবিত্র ঐতিহাসিক মাজার শরিফ।",
    "fullHistory": "হযরত শাহজালালের অন্যতম সঙ্গী শাহ কামালের এই মাজারটি স্থানীয় ও দূর-দূরান্তের মানুষের কাছে একটি পবিত্র স্থান।"
  },
  "Garo Cultural Heritage Sites": {
    "name": "গারো সাংস্কৃতিক ঐতিহ্য সাইট",
    "description": "গারো আদিবাসীদের জীবনযাত্রা ও ঐতিহ্যবাহী সাংস্কৃতিক স্থান।",
    "fullHistory": "গারো সম্প্রদায়ের ঐতিহ্যবাহী ওয়ানগালা উৎসব এবং তাদের জীবনযাত্রা ও পোশাকের সমৃদ্ধ সাংস্কৃতিক রূপ এখানে দেখা যায়।"
  },
  "Birisiri": {
    "name": "বিরিশিরি",
    "description": "সোমেশ্বরী নদী ও চীনা মাটির খনির এক দৃষ্টিনন্দন প্রাকৃতিক স্থান।",
    "fullHistory": "বিরিশিরির কালচারাল একাডেমি এবং সোমেশ্বরী নদীর শান্ত রূপ পর্যটকদের কাছে অত্যন্ত জনপ্রিয় বেড়ানোর জায়গা।"
  },
  "China Clay Hills": {
    "name": "চীনা মাটির পাহাড়",
    "description": "সিরামিক মাটির সুন্দর সাদা ও গোলাপী পাহাড় এবং চমৎকার নীল জলের হ্রদ।",
    "fullHistory": "চীনা মাটি উত্তোলনের ফলে পাহাড়ের মাঝে মাঝে জমা হওয়া বৃষ্টির পানি এখানে পান্না সবুজ ও নীল রঙের হ্রদের রূপ নিয়েছে।"
  },
  "Someshwari River": {
    "name": "সোমেশ্বরী নদী",
    "description": "ভারতের মেঘালয় পাহাড় থেকে নেমে আসা এক অসাধারণ স্বচ্ছ পানির পাহাড়ি নদী।",
    "fullHistory": "নদীর বুক চিরে জেগে ওঠা বালুচর এবং ওপারে মেঘালয় পাহাড়ের মেঘের ভেলা সোমেশ্বরীকে এক মায়াবী রূপ দিয়েছে।"
  },
  "Garo Hills Foothills": {
    "name": "গারো পাহাড়ের পাদদেশ",
    "description": "শেরপুর ও নেত্রকোণা সীমান্তে ভারতের মেঘালয় ঘেঁষা গারো পাহাড়ের সবুজ প্রকৃতি।",
    "fullHistory": "পাহাড়ের কোল ঘেঁষে বয়ে চলা ছড়া এবং আদিবাসীদের পাহাড়ি জুম চাষের বৈচিত্র্যময় পরিবেশ এখানে দেখা যায়।"
  },
  "Shalbon Forest Areas": {
    "name": "শালবন বনাঞ্চল",
    "description": "ময়মনসিংহ ও শেরপুর অঞ্চলের মনোরম শালগাছের প্রাকৃতিক বনভূমি।",
    "fullHistory": "ঘন শালগাছ ও লাল মাটির এই বনাঞ্চলটি বন্যপ্রাণী ও পাখির এক সুন্দর প্রাকৃতিক আশ্রয়স্থল।"
  },
  "Netrokona Wetlands": {
    "name": "নেত্রকোণার হাওর অঞ্চল",
    "description": "নেত্রকোণার সুবিশাল হাওর ও মিঠা পানির প্রাকৃতিক জলাভূমি।",
    "fullHistory": "বর্ষাকালে সাগরের মতো উত্তাল ঢেউ এবং শীতকালে অতিথি পাখির আগমন এই হাওরগুলোর প্রধান বৈশিষ্ট্য।"
  },
  "Durgapur Lake": {
    "name": "দুর্গাপুর লেক",
    "description": "দুর্গাপুরের চীনা মাটির পাহাড় পরিবেষ্টিত হ্রদসমূহ।",
    "fullHistory": "পাহাড়ের ভাজে ভাজে থাকা এই হ্রদগুলোর নীল ও সবুজ পানি পর্যটকদের দারুণ মুগ্ধ করে।"
  },
  "Kangsha River": {
    "name": "কংস নদী",
    "description": "নেত্রকোণার উপর দিয়ে বয়ে চলা একটি ঐতিহ্যবাহী শান্ত নদী।",
    "fullHistory": "নদীমাতৃক বাংলার গ্রামীণ রূপ এবং নদীর ধারের সবুজ ধানক্ষেত কংস নদীর প্রধান সৌন্দর্য।"
  },
  "Old Brahmaputra River": {
    "name": "পুরাতন ব্রহ্মপুত্র নদ",
    "description": "ময়মনসিংহ শহরের পাশ দিয়ে বয়ে চলা পুরাতন ব্রহ্মপুত্র নদ।",
    "fullHistory": "নদের পাড়ের চমৎকার হাওয়া এবং সূর্যাস্ত ভিউ ময়মনসিংহের মানুষের বিকেল কাটানোর সেরা জায়গা।"
  },
  "Netrokona Eco Zones": {
    "name": "নেত্রকোণা ইকো জোন",
    "description": "দুর্গাপুর ও কলমাকান্দার পাহাড় ঘেঁষা ইকো-ট্যুরিজম ও প্রাকৃতিক অভয়ারণ্য।",
    "fullHistory": "পাহাড়ি ঝরনা ও বন্য প্রকৃতির ভারসাম্য বজায় রাখতে এই প্রাকৃতিক ইকো জোন গড়ে উঠেছে।"
  },
  "Sherpur Forest Areas": {
    "name": "শেরপুর বনাঞ্চল",
    "description": "শেরপুরের রাঙ্গুটিয়া ও ঝিনাইগাতীর দৃষ্টিনন্দন প্রাকৃতিক শালবন।",
    "fullHistory": "ঘন বনের মধ্য দিয়ে বয়ে চলা পাহাড়ি ঝিরিপথ ও বন্য হাতির বিচরণ ক্ষেত্র হিসেবে এটি পরিচিত।"
  },
  "Madhutila Eco Park": {
    "name": "মধুটিলা ইকোপার্ক",
    "description": "শেরপুরের নালিতাবাড়ীতে পাহাড় ও বনের মাঝে গড়ে ওঠা চমৎকার এক পার্ক।",
    "fullHistory": "গারো পাহাড়ের কোল ঘেঁষে গড়ে ওঠা এই পার্কে ঝুলন্ত ব্রিজ, ওয়াচ টাওয়ার ও প্যাডেল বোটের সুবিধা রয়েছে।"
  },
  "Gajni Leisure Park": {
    "name": "গজনি অবকাশ কেন্দ্র",
    "description": "শেরপুরের ঝিনাইগাতীতে পাহাড় ও কৃত্রিম হ্রদে ঘেরা দৃষ্টিনন্দন পিকনিক ও অবকাশ কেন্দ্র।",
    "fullHistory": "পাহাড়ের চূড়ায় ড্রাগন টানেল, ঝুলন্ত সেতু ও ওয়াচ টাওয়ার থেকে ভারতের মেঘালয় পাহাড়ের চমৎকার ভিউ পাওয়া যায়।"
  },
  "Nalitabari Nature Trails": {
    "name": "নালিতাবাড়ী নেচার ট্রেইল",
    "description": "নালিতাবাড়ীর গারো পাহাড়ের জঙ্গল ও পাহাড়ি ঝিরিপথ ট্র্যাকিং ট্রেইল।",
    "fullHistory": "অ্যাডভেঞ্চারপ্রেমীদের জন্য পাহাড়ি প্রকৃতি ও আদিবাসী পল্লীর মধ্য দিয়ে ট্রেকিং করার এটি এক চমৎকার পথ।"
  },
  "Susang Natural Landscape": {
    "name": "সুসং প্রাকৃতিক ল্যান্ডস্কেপ",
    "description": "দুর্গাপুরের মেঘালয় সীমান্ত ঘেঁষা সোমেশ্বরী নদী ও গারো পাহাড়ের রূপ।",
    "fullHistory": "সবুজ পাহাড়, হ্রদ এবং বালুময় নদীপথের সংমিশ্রণে এটি দেশের অন্যতম সুন্দর প্রাকৃতিক ল্যান্ডস্কেপ।"
  },
  "Tea Garden Border Areas": {
    "name": "সীমান্তবর্তী চা বাগান এলাকা",
    "description": "ভারতের মেঘালয় সীমান্ত ঘেঁষে গড়ে ওঠা সবজি চা বাগান ও সীমান্ত ভিউ।",
    "fullHistory": "ভারতের মেঘালয়ের খাড়া পাহাড়ের পাদদেশে এ দেশের চা বাগানগুলো এক চমৎকার দৃশ্যের সৃষ্টি করে।"
  },
  "Tribal Village Tourism": {
    "name": "উপজাতি গ্রাম পর্যটন",
    "description": "আদিবাসী পাড়া ও তাদের বৈচিত্র্যময় জীবনযাত্রা।",
    "fullHistory": "আদিবাসীদের ঐতিহ্যবাহী মাচাং ঘর, জুম চাষ ও বুনন শিল্প পাহাড়ি সংস্কৃতির এক সমৃদ্ধ রূপ তুলে ধরে।"
  },
  "Riverside Camping Zones": {
    "name": "নদীর পারের ক্যাম্পিং জোন",
    "description": "নদীর বালুচরে তাবু খাটিয়ে ক্যাম্পিং ও তারাপূজার অসাধারণ অভিজ্ঞতা।",
    "fullHistory": "নদীর পাড়ে ক্যাম্পফায়ার ও বুনো প্রকৃতির মাঝে রাত কাটানোর রোমাঞ্চকর সুযোগ এখানে পাওয়া যায়।"
  },
  "Haor Ecosystem Areas": {
    "name": "হাওর ইকোসিস্টেম জোন",
    "description": "মিঠা পানির জলজ জীববৈচিত্র্য ও করচ বন।",
    "fullHistory": "হাওরের হিজল-করচ গাছ এবং দেশীয় মৎস্য ও পাখির অভয়াশ্রম আমাদের পরিবেশের জন্য অত্যন্ত গুরুত্বপূর্ণ।"
  },
  "Rural Eco Tourism Spots": {
    "name": "গ্রামীণ ইকো-ট্যুরিজম স্পট",
    "description": "সবুজ ধানক্ষেত, খড়ের ঘর ও মাটির গন্ধমাখা বাংলার আসল গ্রাম্য পরিবেশ।",
    "fullHistory": "শহরের যান্ত্রিকতা থেকে দূরে গ্রামীণ আতিথেয়তা ও তাজা খাবার উপভোগ করতে পর্যটকরা এই শান্ত গ্রামগুলোতে আসেন।"
  },
  "Garo Hills": {
    "name": "গারো পাহাড়",
    "description": "শেরপুর ও নেত্রকোণা জুড়ে বিস্তৃত ভারতের মেঘালয় ঘেঁষা সবুজ পাহাড়ি অঞ্চল।",
    "fullHistory": "গারো আদিবাসীদের আবাসভূমি এই পাহাড়গুলো সবুজ চিরসবুজ অরণ্য ও পাহাড়ি ঝিরিপথে ভরপুর।"
  },
  "Birisiri Hills": {
    "name": "বিরিশিরি পাহাড়",
    "description": "দুর্গাপুরের সোমেশ্বরী নদীর পাড়ের চীনা মাটির গোলাপী ও সাদা মাটির টিলাসমূহ।",
    "fullHistory": "চীনা মাটির প্রাকৃতিক টিলা এবং চারপাশের সবুজের মেলা বিরিশিরির অন্যতম ল্যান্ডমার্ক।"
  },
  "Durgapur Hills": {
    "name": "দুর্গাপুর পাহাড়",
    "description": "নেত্রকোণার দুর্গাপুর সীমান্তের সবুজ গারো পাহাড়ের দৃশ্য।",
    "fullHistory": "সীমান্তবর্তী এই পাহাড়গুলোর ভাজে ভাজে মেঘের ওড়াউড়ি এবং বুনো প্রকৃতি দারুণ আকর্ষণীয়।"
  },
  "Border Hill Viewpoints": {
    "name": "সীমান্ত পাহাড়ি ভিউপয়েন্ট",
    "description": "বাংলাদেশ-ভারত সীমান্তের পাহাড়ের চূড়ার চমৎকার দৃশ্যপট।",
    "fullHistory": "সীমান্তের ওপারে ভারতের মেঘালয়ের উঁচু পাহাড়গুলোর উপর মেঘ জমে থাকার দৃশ্য এখান থেকে স্পষ্ট দেখা যায়।"
  }
};

export const ATTRACTION_TRANSLATIONS = {
  "Laboni Beach (Main Beach)": {
    "name": "লাবণী সৈকত (মূল সৈকত)",
    "description": "কক্সবাজারের প্রাণকেন্দ্র — বিশ্বের দীর্ঘতম বালুকাময় সমুদ্র সৈকতের সবচেয়ে জনপ্রিয় অংশ।",
    "whyVisit": "হোটেল ও স্ট্রিট ফুডের সবচেয়ে কাছে এবং আকর্ষণীয় সূর্যাস্ত দেখার প্রধান সৈকত।"
  },
  "Kolatoli Beach": {
    "name": "কলাতলী সৈকত",
    "description": "লাবণী সৈকতের দক্ষিণে অবস্থিত তুলনামূলক শান্ত ও পরিবার বান্ধব সৈকত।",
    "whyVisit": "সাঁতার কাটার জন্য চমৎকার এবং এখানে সুন্দর সূর্যাস্ত দেখা যায়।"
  },
  "Sugandha Beach": {
    "name": "সুগন্ধা সৈকত",
    "description": "পরিষ্কার ও কম কোলাহলপূর্ণ সৈকত যা চমৎকার সামুদ্রিক খাবারের জন্য বিখ্যাত।",
    "whyVisit": "তাজা মাছ ফ্রাই খাওয়ার স্টলগুলো এই সৈকতের মূল আকর্ষণ।"
  },
  "Himchari National Park & Waterfall": {
    "name": "হিমছড়ি জাতীয় উদ্যান ও ঝরনা",
    "description": "মেরিন ড্রাইভের পাশে পাহাড় ও সাগরের মিলনস্থলে অবস্থিত একটি সুন্দর পার্ক ও পাহাড়ি ঝরনা।",
    "whyVisit": "পাহাড়ের চূড়া থেকে সাগরের দিগন্ত বিস্তৃত রূপ এবং বন্য প্রকৃতি দেখার সেরা সুযোগ।"
  },
  "Cox's Bazar–Teknaf Marine Drive": {
    "name": "কক্সবাজার-টেকনাফ মেরিন ড্রাইভ",
    "description": "৮০ কিমি দীর্ঘ বিশ্বের অন্যতম দীর্ঘ ও দৃষ্টিনন্দন উপকূলীয় সড়ক।",
    "whyVisit": "একপাশে উঁচু সবুজ পাহাড় আর অন্যপাশে সাগরের নীল জলের অপূর্ব মিতালি।"
  },
  "Inani Beach": {
    "name": "ইনানী সৈকত",
    "description": "কক্সবাজারের ৩২ কিমি দক্ষিণে অবস্থিত প্রবাল পাথরে ভরা এক শান্ত ও পরিচ্ছন্ন সৈকত।",
    "whyVisit": "ভাটার সময় ভেসে ওঠে পাথরের উপর দাঁড়িয়ে নীল জল উপভোগ করার দারুণ অভিজ্ঞতা।"
  },
  "Burmese Market (Rakhain Market)": {
    "name": "বার্মিজ মার্কেট (রাখাইন মার্কেট)",
    "description": "রাখাইন সম্প্রদায়ের পরিচালিত ঐতিহ্যবাহী বার্মিজ ও আচার-পণ্য সামগ্রীর বাজার।",
    "whyVisit": "হাতে তৈরি রাখাইন শাল, কাঠের কারুশিল্প ও বিখ্যাত আচার কেনার সেরা স্থান।"
  },
  "Dolphin Point (Kollatoli Point)": {
    "name": "ডলফিন পয়েন্ট (কলাতলী পয়েন্ট)",
    "description": "কলাতলী সৈকতের প্রবেশদ্বার যেখানে সাগরের ডলফিনের একটি স্মারক ভাস্কর্য রয়েছে।",
    "whyVisit": "ছবি তোলার চমৎকার পয়েন্ট এবং বাস টার্মিনালের খুব কাছে।"
  },
  "Radiant Fish World (Aquarium)": {
    "name": "রেডিয়েন্ট ফিশ ওয়ার্ল্ড (অ্যাকোয়ারিয়াম)",
    "description": "কক্সবাজারে অবস্থিত বাংলাদেশের অন্যতম বৃহত্তম ও চমৎকার সামুদ্রিক অ্যাকোয়ারিয়াম।",
    "whyVisit": "সাগরের তলদেশের হাঙ্গর, কোরালসহ বিভিন্ন অদ্ভুত সামুদ্রিক মাছ খুব কাছ থেকে দেখার সুযোগ।"
  },
  "Sajek Helipad Viewpoint": {
    "name": "সাজেক হেলিপ্যাড ভিউপয়েন্ট",
    "description": "সাজেক ভ্যালির সর্বোচ্চ চূড়া যেখান থেকে মেঘের সমুদ্রের অসাধারণ দৃশ্য দেখা যায়।",
    "whyVisit": "ভোরে মেঘের ভেলা ও অসাধারণ সূর্যোদয় দেখার জন্য সাজেকের সেরা স্পট।"
  },
  "Ruilui Para (Chakma Village)": {
    "name": "রুইলুই পাড়া (চাকমা গ্রাম)",
    "description": "সাজেক ভ্যালির মূল কেন্দ্রে অবস্থিত ঐতিহ্যবাহী পাহাড়ি আদিবাসী চাকমা পাড়া।",
    "whyVisit": "পাহাড়ি জীবনযাত্রা, কটেজ ও আদিবাসী সংস্কৃতির খুব কাছাকাছি অভিজ্ঞতা।"
  },
  "Konglak Para & Lusai Village": {
    "name": "কংলাক পাড়া ও লুসাই গ্রাম",
    "description": "সাজেক ভ্যালির শেষ প্রান্তের সর্বোচ্চ পাহাড়ি চূড়া ও লুসাই নৃগোষ্ঠীর পাড়া।",
    "whyVisit": "কংলাক পাহাড়ের চূড়া থেকে সম্পূর্ণ সাজেক ও ভারতের মিজোরাম পাহাড়ের ভিউ দেখা যায়।"
  },
  "Cloud Viewpoints & Valley Trail": {
    "name": "ক্লাউড ভিউপয়েন্ট ও ভ্যালি ট্রেইল",
    "description": "সাজেকের মূল রাস্তার পাশে মেঘ ও পাহাড় দেখার চমৎকার সব স্পট।",
    "whyVisit": "হাঁটতে হাঁটতে চারপাশের সবুজ ভ্যালির অসাধারণ ছবি তোলার সুবিধা।"
  },
  "Alutila Cave (nearby, Khagrachhari)": {
    "name": "আলুটিলা গুহা (খাগড়াছড়ি)",
    "description": "খাগড়াছড়ির আলুটিলা পাহাড়ে অবস্থিত প্রাকৃতিক পাথুরে অন্ধকার সুড়ঙ্গ।",
    "whyVisit": "মশাল জ্বালিয়ে এই রোমাঞ্চকর অন্ধকার পাথুরে গুহার ভেতর দিয়ে হেঁটে যাওয়ার অনন্য অনুভূতি।"
  },
  "Boat Trail – Core Swamp Zone": {
    "name": "নৌকা ট্রেইল – সোয়াম্প জোন",
    "description": "রাতারগুল জলাবনের পানিতে নিমজ্জিত গাছের মধ্য দিয়ে কাঠের নৌকায় ভ্রমণ।",
    "whyVisit": "পানির ওপর ভেসে থাকা বনের মায়াবী শান্ত রূপ দেখার একমাত্র মাধ্যম।"
  },
  "Swamp Watch Tower": {
    "name": "সোয়াম্প ওয়াচ টাওয়ার",
    "description": "রাতারগুল বনের মাঝে অবস্থিত একটি কাঠের পর্যবেক্ষণ টাওয়ার।",
    "whyVisit": "টাওয়ারের ওপর থেকে সম্পূর্ণ জলাবন ও চারপাশের হাওরের বার্ডস-আই ভিউ দেখা যায়।"
  },
  "Gowainghat River Viewpoint": {
    "name": "গোয়াইনঘাট নদী ভিউপয়েন্ট",
    "description": "রাতারগুলের কোল ঘেঁষে বয়ে চলা পাহাড়ি গোয়াইন নদীর মনোরম তীর।",
    "whyVisit": "নদীর শান্ত রূপ ও ওপারে ভারতের মেঘালয় পাহাড়ের মেঘের মেলা দেখার সুন্দর স্পট।"
  },
  "Bishwanath Riverside Trail": {
    "name": "বিশ্বনাথ নদীর পারের ট্রেইল",
    "description": "রাতারগুলের বাটারফ্লাই পার্কের কাছে নদী তীরবর্তী শান্ত হাঁটার পথ।",
    "whyVisit": "সিলেটের গ্রামীণ হাওর অঞ্চলের অপরূপ সৌন্দর্য ও শান্ত প্রকৃতি এখানে উপভোগ করা যায়।"
  },
  "Sunrise & Sunset Viewing Point": {
    "name": "সূর্যোদয় ও সূর্যাস্ত ভিউপয়েন্ট",
    "description": "কুয়াকাটা সৈকতের প্রধান আকর্ষণ যেখান থেকে সূর্যোদয় ও সূর্যাস্ত দুটোই দেখা যায়।",
    "whyVisit": "একই স্থানে দাঁড়িয়ে সাগরের বুকে সূর্যোদয় ও সূর্যাস্ত দেখার দুর্লভ অভিজ্ঞতা।"
  },
  "Gangamati Reserved Forest": {
    "name": "গঙ্গামতি সংরক্ষিত বন",
    "description": "কুয়াকাটা সৈকতের পূর্ব প্রান্তে অবস্থিত ম্যানগ্রোভ বনাঞ্চল।",
    "whyVisit": "ঝাউবন ও বালিয়াড়ির মধ্য দিয়ে ট্র্যাকিং করে বনের বন্য রূপ উপভোগ করার জায়গা।"
  },
  "Fatrar Char (Island)": {
    "name": "ফাতরার চর (দ্বীপ)",
    "description": "কুয়াকাটার কাছে অবস্থিত সুন্দরবনের অংশবিশেষ একটি ম্যানগ্রোভ দ্বীপখণ্ড।",
    "whyVisit": "লঞ্চে চড়ে ম্যানগ্রোভ বনে গিয়ে হরিণ ও বনের রূপ খুব কাছ থেকে দেখার অ্যাডভেঞ্চার।"
  },
  "Misripara Buddhist Temple": {
    "name": "মিশ্রিপাড়া বৌদ্ধ মন্দির",
    "description": "কুয়াকাটার মিশ্রিপাড়ায় অবস্থিত রাখাইনদের ঐতিহ্যবাহী সীমা বৌদ্ধ বিহার।",
    "whyVisit": "এখানকার বিশাল বুদ্ধ মূর্তি এবং রাখাইন সংস্কৃতির প্রাচীন কাঠের স্থাপত্য নিদর্শন।"
  },
  "Three Rivers Mohona (Confluence)": {
    "name": "তিন নদীর মোহনা",
    "description": "কুয়াকাটার পশ্চিমে তিনটি নদীর বঙ্গোপসাগরে পতনের মোহনা ও লাল কাঁকড়ার চর।",
    "whyVisit": "ডিগন্ত বিস্তৃত মোহনার রূপ এবং চরে লাল কাঁকড়ার মেলা।"
  },
  "Karamjal Wildlife Centre": {
    "name": "করমজল বন্যপ্রাণী কেন্দ্র",
    "description": "সুন্দরবনের প্রবেশদ্বারে পশুর নদীর তীরে অবস্থিত বন্যপ্রাণী প্রজনন কেন্দ্র।",
    "whyVisit": "সুন্দরবনের কাঠের চমৎকার ট্রেইলে হেঁটে হরিণ, কুমির ও বানর খুব কাছ থেকে দেখার জায়গা।"
  },
  "Kotka Wildlife Sanctuary": {
    "name": "কটকা বন্যপ্রাণী অভয়ারণ্য",
    "description": "সুন্দরবনের গহীনে অবস্থিত বাঘ ও হরিণের প্রধান অভয়ারণ্য।",
    "whyVisit": "ম্যানগ্রোভ বনের আসল রূপ, বন্য হরিণ এবং বাঘের পায়ের ছাপ দেখার স্থান।"
  },
  "Harbaria Eco-tourism Spot": {
    "name": "হাড়বাড়িয়া ইকো-ট্যুরিজম স্পট",
    "description": "সুন্দরবনের ভেতরে অবস্থিত একটি মনোরম ওয়াচ টাওয়ার ও হ্রদ পরিবেষ্টিত ট্রেইল।",
    "whyVisit": "বনের গভীর নিস্তব্ধতা উপভোগ এবং বাঘের পায়ের ছাপ দেখার স্পট।"
  },
  "Hiron Point (Nilkamal)": {
    "name": "হিরণ পয়েন্ট (নীলকমল)",
    "description": "সুন্দরবনের দক্ষিণের একটি প্রত্যন্ত অভয়ারণ্য কেন্দ্র।",
    "whyVisit": "নদীর মোহনায় ডলফিনের খেলা এবং মায়াবী বনের শান্ত পরিবেশ।"
  },
  "Piyain River Stone Collection": {
    "name": "পিয়াইন নদী ও পাথর উত্তোলন",
    "description": "জাফলংয়ের পিয়াইন নদী থেকে পাথর সংগ্রহের দৃশ্য।",
    "whyVisit": "স্বচ্ছ নীল পানি, নদীর ওপারে ভারতের মেঘালয়ের খাড়া পাহাড় ও ঝুলন্ত সেতুর ভিউ।"
  },
  "Dauki River & Indian Border Viewpoint": {
    "name": "ডাউকি নদী ও ভারতীয় সীমান্ত ভিউ",
    "description": "জাফলং সীমান্তে ডাউকি নদীর ঝুলন্ত ব্রীজ ও পাহাড়ের দৃশ্য।",
    "whyVisit": "সীমান্তের জিরো পয়েন্টে দাঁড়িয়ে স্বচ্ছ জলরাশির পাহাড়ি নদীর রূপ উপভোগ।"
  },
  "Khasi Palli (Tribal Village)": {
    "name": "খাসিয়া পল্লী (আদিবাসী গ্রাম)",
    "description": "জাফলংয়ের চা বাগানের ভেতরে অবস্থিত আদিবাসী খাসিয়া পাড়া।",
    "whyVisit": "খাসিয়াদের মাতৃতান্ত্রিক সমাজব্যবস্থা এবং তাদের নিজস্ব সংস্কৃতির অভিজ্ঞতা।"
  },
  "Volagonj White Stone Quarry": {
    "name": "ভোলাগঞ্জ সাদা পাথর কোয়ারি",
    "description": "কোম্পানীগঞ্জে ভারতের মেঘালয়ের কোল ঘেঁষে অবস্থিত ধলাই নদীর সাদা পাথরের বিছানা।",
    "whyVisit": "মেঘালয়ের পাহাড় থেকে ধেয়ে আসা স্বচ্ছ হিমশীতল জলরাশি ও সাদা পাথরের মেলা।"
  },
  "Houseboat Sunrise Cruise": {
    "name": "হাউসবোট সূর্যোদয় ক্রুজ",
    "description": "টাঙ্গুয়ার হাওরের অথৈ পানিতে হাউসবোটে রাত কাটানো।",
    "whyVisit": "হাওরের শান্ত জলে ভাসমান কটেজে থাকার অনুভূতি ও পরিযায়ী পাখির কলতান।"
  },
  "Watchtower & Birdwatching Hides": {
    "name": "ওয়াচ টাওয়ার ও পাখি পর্যবেক্ষণ",
    "description": "টাঙ্গুয়ার হাওরের মাঝখানে অবস্থিত ওয়াচ টাওয়ার ও অভয়ারণ্য।",
    "whyVisit": "শীতকালে হাজার হাজার অতিথি পাখির ওড়াউড়ি দেখার সেরা জায়গা।"
  },
  "Village Homestay & Cultural Interaction": {
    "name": "হাওরের গ্রামে রাত্রিবাস ও সাংস্কৃতিক মেলবন্ধন",
    "description": "হাওরের মাঝখানের ছোট ছোট গ্রামগুলোতে মাছ ধরার অভিজ্ঞতা।",
    "whyVisit": "হাওর অঞ্চলের মানুষের সংগ্রামী ও বৈচিত্র্যময় জলজ জীবন খুব কাছ থেকে দেখার সুযোগ।"
  },
  "North Beach & Coral Zone": {
    "name": "উত্তর সৈকত ও প্রবাল অঞ্চল",
    "description": "সেন্ট মার্টিন দ্বীপের উত্তরের শান্ত সৈকত যেখানে প্রচুর জীবন্ত প্রবাল রয়েছে।",
    "whyVisit": "স্বচ্ছ নীল পানিতে স্নরকেলিং করা ও প্রবাল পাথর দেখার সেরা স্থান।"
  },
  "Chera Dwip (Separate Island)": {
    "name": "ছেঁড়া দ্বীপ",
    "description": "সেন্ট মার্টিনের দক্ষিণে অবস্থিত আলাদা হয়ে যাওয়া প্রবাল দ্বীপখণ্ড।",
    "whyVisit": "নির্জনতায় স্বচ্ছতম নীল জল ও প্রবাল পাথরের অপরূপ দৃশ্য।"
  },
  "Island Night Fishing Experience": {
    "name": "দ্বীপে রাতের মাছ ধরার অভিজ্ঞতা",
    "description": "সেন্ট মার্টিনের জেলেদের সাথে রাতে সমুদ্রে মাছ ধরার অভিজ্ঞতা।",
    "whyVisit": "তারাময় আকাশের নিচে সাগরের বুকে মাছ ধরা এবং তা বারবিকিউ করার সুযোগ।"
  },
  "Coconut Grove Walk & Island Circuit": {
    "name": "নারকেল বাগান ও দ্বীপ প্রদক্ষিণ",
    "description": "সাইকেলে চড়ে সম্পূর্ণ সেন্ট মার্টিন দ্বীপের সৈকত ঘুরে দেখা।",
    "whyVisit": "দ্বীপের কোলাহলমুক্ত শান্ত গ্রামীণ পরিবেশ ও সমুদ্রের গর্জন কাছ থেকে অনুভব করা।"
  },
  "Nilgiri Summit & Cloud Deck": {
    "name": "নীলগিরি চূড়া ও ক্লাউড ডেক",
    "description": "বান্দরবানের নীলগিরি পাহাড়ের চূড়া যেখান থেকে মেঘের সমুদ্র দেখা যায়।",
    "whyVisit": "মেঘের ওপর দাঁড়িয়ে পাহাড়ের ভাজে ভাজে সূর্যোদয় দেখার সেরা স্পট।"
  },
  "Chimbuk Hill (Tong Ha village)": {
    "name": "চিম্বুক পাহাড় (টং হা গ্রাম)",
    "description": "বাংলাদেশের তৃতীয় সর্বোচ্চ চিম্বুক পাহাড়ের চূড়া ও মারমা আদিবাসী পাড়া।",
    "whyVisit": "পাহাড়ের চূড়া থেকে বান্দরবানের অরণ্যের দৃশ্য ও মারমাদের জুম চাষের সংস্কৃতি।"
  },
  "Boga Lake Trek": {
    "name": "বগা লেক ট্র্যাকিং",
    "description": "রুমা থেকে বগা লেকের পাহাড়ি হ্রদের দুর্গম ট্র্যাকিং পথ।",
    "whyVisit": "পাহাড়ের চূড়ায় অবস্থিত হ্রদের পাশে আদিবাসী কটেজে রাত কাটানোর রোমাঞ্চ।"
  },
  "Remakri Waterfall": {
    "name": "রেমাক্রি জলপ্রপাত",
    "description": "থানচি থেকে সাঙ্গু নদী দিয়ে তিন্দু পার হয়ে রেমাক্রির জলপ্রপাত।",
    "whyVisit": "পাথুরে পাহাড়ি সাঙ্গু নদীতে ইঞ্জিন নৌকার ভ্রমণ ও জলপ্রপাতের রূপ।"
  },
  "Nilachal Summit Viewpoint": {
    "name": "নীলাচল চূড়া ভিউপয়েন্ট",
    "description": "বান্দরবান শহরের কাছে অবস্থিত পাহাড়ি ভিউ পয়েন্ট ও সূর্যাস্ত দেখার জায়গা।",
    "whyVisit": "বিকেলে দিগন্ত বিস্তৃত পাহাড়ের সারি ও সাঙ্গু নদীর গতিপথের ভিউ।"
  },
  "Sangu River Boat Ride": {
    "name": "সাঙ্গু নদীতে নৌকাভ্রমণ",
    "description": "বান্দরবানের সাঙ্গু নদীর বুকে নৌকাভ্রমণ ও দুই ধারের পাহাড়ের দৃশ্য।",
    "whyVisit": "পাহাড়ের কোল ঘেঁষে বয়ে চলা নদীতে নৌকায় ঘুরে বেড়ানোর এক শান্ত সুন্দর অভিজ্ঞতা।"
  },
  "Meghla Eco Park": {
    "name": "মেঘলা ইকোপার্ক",
    "description": "বান্দরবানের প্রবেশদ্বারে অবস্থিত ঝুলন্ত ব্রিজ ও কৃত্রিম হ্রদ পরিবেষ্টিত পার্ক।",
    "whyVisit": "ঝুলন্ত ব্রিজে হাঁটা, ক্যাবল কার ও পরিবার নিয়ে বোটিং করার বিনোদন কেন্দ্র।"
  }
};

export const HOTEL_TRANSLATIONS = {
  "Sayeman Beach Resort": {
    "name": "সায়েম্যান বিচ রিসোর্ট",
    "description": "কক্সবাজারের সুপরিচিত বিচফ্রন্ট রিসোর্ট যা আধুনিক সুযোগ-সুবিধা এবং সমুদ্রের প্যানোরামিক ভিউ প্রদান করে।"
  },
  "Ocean Paradise": {
    "name": "ওশেন প্যারাডাইস",
    "description": "কলাতলী সৈকতের কাছে অবস্থিত অন্যতম সেরা ও বিশ্বমানের সুযোগ-সুবিধা সমৃদ্ধ আধুনিক হোটেল ও রিসোর্ট।"
  },
  "Hotel The Cox Today": {
    "name": "হোটেল দ্য কক্স টুডে",
    "description": "কক্সবাজার শহরের কেন্দ্রস্থলে অবস্থিত ভ্রমণকারীদের অত্যন্ত জনপ্রিয় ও বাজেট-বান্ধব লাক্সারি হোটেল।"
  },
  "Sea Breeze Resort": {
    "name": "সী ব্রিজ রিসোর্ট",
    "description": "কক্সবাজার সৈকতের খুব কাছে অবস্থিত শান্ত পরিবেশ ও আরামদায়ক আধুনিক সুযোগ-সুবিধা সমৃদ্ধ রিসোর্ট।"
  },
  "Sajek Ecolodge": {
    "name": "সাজেক ইকোলোজ",
    "description": "পাহাড়ের চূড়ায় অবস্থিত সম্পূর্ণ বাঁশ ও কাঠের তৈরি পরিবেশ-বান্ধব কটেজ যা চমৎকার ভ্যালির ভিউ দেয়।"
  }
};

export const GUIDE_TRANSLATIONS = {
  "Dhaka Heritage Guides": {
    "name": "ঢাকা হেরিটেজ গাইডস",
    "shortDescription": "ইতিহাস, নদী ও পুরান ঢাকার ঐতিহ্যবাহী খাবার নিয়ে অভিজ্ঞ গাইড সার্ভিস।",
    "fullDescription": "ঢাকা হেরিটেজ গাইডস পুরান ঢাকার গলি, মোগল ইতিহাস এবং ঐতিহ্যবাহী খাবারের চমৎকার স্বাদ ও গল্প নিয়ে দর্শনার্থীদের আনন্দদায়ক ট্যুর পরিচালনা করে।"
  },
  "City Nest Travel Guides": {
    "name": "সিটি নেস্ট ট্রাভেল গাইডস",
    "shortDescription": "ব্যবসায়িক ও সাধারণ পর্যটকদের জন্য শহরের ভেতরে নিরাপদ ও আরামদায়ক দিনব্যাপী ভ্রমণ গাইড সার্ভিস।",
    "fullDescription": "সিটি নেস্ট ট্রাভেল গাইডস ঢাকার দর্শনীয় স্থান, শপিং ও নিরাপদ পরিবহনের সুব্যবস্থাসহ ঢাকার বাইরে সোনারগাঁও ও ভাওয়াল রাজবাড়িতে ট্যুর পরিচালনা করে।"
  },
  "Coastal Breeze Guides": {
    "name": "কোস্টাল ব্রিজ গাইডস",
    "shortDescription": "কক্সবাজারের সমুদ্র সৈকত, ট্র্যাকিং ও দ্বীপ ভ্রমণের অভিজ্ঞ পাহাড়ি গাইড সার্ভিস।",
    "fullDescription": "কোস্টাল ব্রিজ গাইডস কক্সবাজার, সাজেক ও বান্দরবানের দুর্গম এলাকায় সম্পূর্ণ নিরাপদ ও আকর্ষণীয় অ্যাডভেঞ্চার ট্যুর পরিচালনা করে থাকে।"
  },
  "Hill Route Tourists": {
    "name": "হিল রুট ট্যুরিস্টস",
    "shortDescription": "বান্দরবান ও খাগড়াছড়ির পাহাড়ি ট্র্যাকিং, ক্যাম্পিং ও আদিবাসী পাড়া ভ্রমণের অভিজ্ঞ গাইড দল।",
    "fullDescription": "হিল রুট ট্যুরিস্টস বান্দরবানের কেওক্রাডং, বগা লেক এবং বন্য পাহাড়ি এলাকায় অভিজ্ঞ ও বিশ্বস্ত ট্রেকিং গাইড সার্ভিস প্রদান করে।"
  },
  "Sylhet Green Trails": {
    "name": "সিলেট গ্রিন ট্রেইলস",
    "shortDescription": "সিলেটের চা বাগান, রাতারগুল সোয়াম্প বন ও ঝরনা ভ্রমণের অভিজ্ঞ স্থানীয় গাইড।",
    "fullDescription": "সিলেট গ্রিন ট্রেইলস জাফলং, লালাখাল ও শ্রীমঙ্গলের বৃষ্টি অরণ্যে রোমাঞ্চকর ও সুন্দর ইকো-ট্যুর গাইড সেবা দেয়।"
  },
  "Sylhet Heritage Circle": {
    "name": "সিলেট হেরিটেজ সার্কেল",
    "shortDescription": "সিলেটের শাহজালাল মাজার, ঐতিহ্যবাহী খাবার ও হাওর ভ্রমণের বিশ্বস্ত গাইড দল।",
    "fullDescription": "সিলেট হেরিটেজ সার্কেল সিলেটে ধর্মীয় পর্যটন, হাওরের হাউসবোট ট্যুর এবং খাসিয়া আদিবাসী সংস্কৃতি অন্বেষণের বিশেষায়িত গাইড সেবা প্রদান করে।"
  },
  "Rajshahi Royal Guides": {
    "name": "রাজশাহী রয়্যাল গাইডস",
    "shortDescription": "রাজশাহীর পুঠিয়া রাজবাড়ি, প্রাচীন মহাস্থানগড় ও পদ্মা তীরের হেরিটেজ গাইড।",
    "fullDescription": "রাজশাহী রয়্যাল গাইডস প্রাচীন বরেন্দ্র অঞ্চলের রাজবাড়ি, সোমপুর বিহার ও পদ্মার চরের ইতিহাস সংবলিত ঐতিহাসিক ট্যুর পরিচালনা করে।"
  },
  "Mango Route Guides": {
    "name": "ম্যাঙ্গো রুট গাইডস",
    "shortDescription": "রাজশাহীর রেশম কুঠির, আমের বাগান ও নদীমাতৃক বাংলার কৃষি-পর্যটন গাইড।",
    "fullDescription": "ম্যাঙ্গো রুট গাইডস গ্রীষ্মকালীন আমের বাগান ভ্রমণ, রেশম কারখানা ও পদ্মা নদীর চরে নৌকাভ্রমণের বিশেষায়িত গাইড সেবা দেয়।"
  },
  "Sundarbans Explorer Guides": {
    "name": "সুন্দরবন এক্সপ্লোরার গাইডস",
    "shortDescription": "সুন্দরবনের গহীন ম্যানগ্রোভ অরণ্য ও বন্যপ্রাণী সাফারির লাইসেন্সধারী দক্ষ গাইড দল।",
    "fullDescription": "সুন্দরবন এক্সপ্লোরার গাইডস মংলা ও খুলনা থেকে সুন্দরবনের করমজল, কটকা ও হিরণ পয়েন্টে বন্যপ্রাণী ও বাঘ দেখার রোমাঞ্চকর নৌ ট্যুর পরিচালনা করে।"
  },
  "River Delta Travel Co.": {
    "name": "রিভার ডেল্টা ট্রাভেল কোং",
    "shortDescription": "বাগেরহাটের ষাট গম্বুজ মসজিদ ও খুলনা বিভাগের প্রাচীন নদী বন্দরের হেরিটেজ গাইড।",
    "fullDescription": "রিভার ডেল্টা ট্রাভেল কোং বাগেরহাটের ঐতিহাসিক ইসলামি স্থাপত্য ও সুন্দরবনের কোল ঘেঁষে বয়ে চলা পশুর নদীর তীরে ইকো-ট্যুর ও ঐতিহ্যবাহী গাইড সেবা দেয়।"
  },
  "Barishal Waterways": {
    "name": "বরিশাল ওয়াটারওয়েজ",
    "shortDescription": "বরিশালের বিখ্যাত ভাসমান পেয়ারা বাজার ও লঞ্চ ভ্রমণের নদীপথের গাইড দল।",
    "fullDescription": "বরিশাল ওয়াটারওয়েজ বরিশালের নদীনালা, খালের ওপর ভাসমান বাজার এবং কুয়াকাটা সমুদ্র সৈকতে সূর্যোদয় দেখার আকর্ষণীয় ভ্রমণ গাইড সেবা দেয়।"
  },
  "Delta Culture Guides": {
    "name": "ডেল্টা কালচার গাইডস",
    "shortDescription": "বরিশালের ঐতিহ্যবাহী গ্রামীণ জীবন, নদী ও মনপুরা দ্বীপের সাংস্কৃতিক ভ্রমণ গাইড।",
    "fullDescription": "ডেল্টা কালচার গাইডস নদীমাতৃক বরিশালের প্রত্যন্ত গ্রাম, মাছ ধরা ও দক্ষিণাঞ্চলের ঐতিহ্যবাহী জীবনযাত্রা অন্বেষণের চমৎকার সেবা দেয়।"
  },
  "Rangpur Heritage Explorers": {
    "name": "রংপুর হেরিটেজ এক্সপ্লোরারস",
    "shortDescription": "রংপুরের তাজহাট রাজবাড়ি ও দিনাজপুরের কান্তজিউ মন্দিরের ইতিহাস গাইড।",
    "fullDescription": "রংপুর হেরিটেজ এক্সপ্লোরারস উত্তরবঙ্গের ঐতিহ্যবাহী রাজবাড়ি, টেরাকোটা মন্দির ও ব্রহ্মপুত্র নদের চরে ঐতিহাসিক ট্যুর গাইড সেবা দেয়।"
  },
  "Northern Green Guides": {
    "name": "নর্দার্ন গ্রিন গাইডস",
    "shortDescription": "পঞ্চগড়ের সমতলের চা বাগান, তেঁতুলিয়া ও হিমালয় ভিউ ট্রেইলের স্থানীয় গাইড।",
    "fullDescription": "নর্দার্ন গ্রিন গাইডস পঞ্চগড় সমতলের চা বাগান, বাংলাবান্ধা জিরো পয়েন্ট ও শীতকালীন কাঞ্চনজঙ্ঘা দেখার বিশেষায়িত ট্যুর পরিচালনা করে।"
  },
  "Mymensingh Valley Guides": {
    "name": "ময়মনসিংহ ভ্যালি গাইডস",
    "shortDescription": "মুক্তাগাছের শশী লজ ও পুরাতন ব্রহ্মপুত্র নদীর তীরের ঐতিহ্যবাহী ট্যুর গাইড।",
    "fullDescription": "ময়মনসিংহ ভ্যালি গাইডস ব্রহ্মপুত্র নদের সংস্কৃতি, রাজকীয় শশী লজ ও মুক্তাগাছের মণ্ডা তৈরির প্রণালী দর্শনের চমৎকার গাইড সেবা দেয়।"
  },
  "Garo Hills Travel Assist": {
    "name": "গারো হিলস ট্রাভেল অ্যাসিস্ট",
    "shortDescription": "নেত্রকোণার বিরিশিরি চীনা মাটির পাহাড় ও গারো সম্প্রদায়ের পাহাড়ি গাইড সেবা।",
    "fullDescription": "গারো হিলস ট্রাভেল অ্যাসিস্ট নেত্রকোণা ও শেরপুরের পাহাড়ি সীমান্তে গারো উপজাতিদের সংস্কৃতি ও চীনা মাটির হ্রদে গাইড সার্ভিস দেয়।"
  }
};

export const INDIVIDUAL_GUIDE_TRANSLATIONS = {
  "Sajedul Karim": {
    "name": "সাজেদুল করিম",
    "bio": "ইতিহাস ও পুরান ঢাকার ঐতিহ্যবাহী স্থান এবং স্থানীয় খাবারের গল্প জানতে সেরা গাইড।"
  },
  "Rimsha Chowdhury": {
    "name": "রিমশা চৌধুরী",
    "bio": "ফটোগ্রাফি ও ডে-ট্যুর পরিচালনায় অভিজ্ঞ। যেকোনো ছোটখাটো ভ্রমণ পরিকল্পনায় অত্যন্ত বন্ধুসুলভ।"
  },
  "Ahsan Rahman": {
    "name": "Ahsan Rahman",
    "bio": "কক্সবাজারের সমুদ্র ও পাহাড়ি এলাকায় সম্পূর্ণ নিরাপত্তা নিশ্চিতকারী নির্ভরযোগ্য গাইড।"
  },
  "Nadia Islam": {
    "name": "নাদিয়া ইসলাম",
    "bio": "পাহাড়ি ট্র্যাকিং ও ক্যাম্পিংয়ের চমৎকার ব্যবস্থা ও ট্রেইল গাইডের জন্য সবার প্রিয়।"
  },
  "Mehdi Hasan": {
    "name": "মেহেদী হাসান",
    "bio": "রাতারগুলের জলাবন ও শ্রীমঙ্গলের বৃষ্টি অরণ্যে বন্যপ্রাণী পর্যবেক্ষণে অত্যন্ত পারদর্শী।"
  },
  "Farhan Rahman": {
    "name": "ফারহান রহমান",
    "bio": "সিলেটের হাওরে হাউসবোট ট্যুর ও খাসিয়া আদিবাসী গ্রাম অন্বেষণে সেরা সঙ্গী।"
  },
  "Tariq Hossain": {
    "name": "তারিক হোসেন",
    "bio": "পুঠিয়া রাজবাড়ির স্থাপত্য এবং প্রাচীন বরেন্দ্র অঞ্চলের ইতিহাসের বিশেষজ্ঞ গাইড।"
  },
  "Anika Noor": {
    "name": "আনিকা নূর",
    "bio": "গ্রীষ্মকালীন আমের বাগান ভ্রমণ ও পদ্মার চরের ঐতিহ্যবাহী খাবারের চমৎকার গাইড।"
  },
  "Shamim Akter": {
    "name": "شামীম আক্তার",
    "bio": "সুন্দরবনের গহীনে রয়্যাল বেঙ্গল টাইগার ও বন্যপ্রাণী অভয়ারণ্যে বোট ট্যুরের দক্ষ গাইড।"
  },
  "Mariam Rahman": {
    "name": "মরিয়ম রহমান",
    "bio": "বাগেরহাটের ঐতিহাসিক মসজিদ ও খুলনা ডেল্টার সংস্কৃতির নির্ভরযোগ্য গাইড।"
  },
  "Jahidul Islam": {
    "name": "জাহিদুল ইসলাম",
    "bio": "বরিশালের খালের ওপর ভাসমান পেয়ারা বাজার ও লঞ্চ ভ্রমণের নদীপথের দক্ষ পাইলট গাইড।"
  },
  "Nusrat Jahan": {
    "name": "Nusrat Jahan",
    "bio": "মনপুরা দ্বীপ ভ্রমণ এবং বরিশালের গ্রামীণ পিঠা ও ঐতিহ্যবাহী রান্না চেখে দেখার সেরা গাইড।"
  },
  "Moshiur Rahman": {
    "name": "মশিউর রহমান",
    "bio": "তাজহাট রাজবাড়ী ও রামসাগর দীঘির ঐতিহাসিক প্রেক্ষাপট সম্পর্কে অভিজ্ঞ গাইড।"
  },
  "Laila Akter": {
    "name": "লায়লা আক্তার",
    "bio": "তেঁতুলিয়া সীমান্ত ও পঞ্চগড় সমতলের চা বাগান ভ্রমণের অন্যতম সেরা স্থানীয় গাইড।"
  },
  "Nahidul Alam": {
    "name": "নাহিদুল alam",
    "bio": "ব্রহ্মপুত্রের চর ও ময়মনসিংহের ঐতিহ্যবাহী শশী লজের ইতিহাস বর্ণনাকারী গাইড।"
  },
  "Shila Marma": {
    "name": "সীলা মারমা",
    "bio": "দুর্গাপুরের সোমেশ্বরী নদী ও চীনা মাটির গুহা এবং গারো পাহাড় ভ্রমণের আদিবাসী গাইড।"
  }
};

export const SPECIALTY_TRANSLATIONS = {
  "Historical Tours": "ঐতিহাসিক ভ্রমণ",
  "Religious Tourism": "ধর্মীয় পর্যটন",
  "Photography": "ফটোগ্রাফি",
  "Food Tours": "খাদ্য ভ্রমণ",
  "Beach Tours": "সৈকত ভ্রমণ",
  "Adventure Tours": "রোমাঞ্চকর ভ্রমণ",
  "Nature Tours": "প্রাকৃতিক ভ্রমণ",
  "Camping": "ক্যাম্পিং",
  "Wildlife Tours": "বন্যপ্রাণী ভ্রমণ",
  "Cultural Tours": "সাংস্কৃতিক ভ্রমণ",
  "Heritage Tours": "ঐতিহ্যবাহী ভ্রমণ",
  "River Tours": "নদী ভ্রমণ",
  "Boat Tours": "নৌকা ভ্রমণ",
  "Village Tours": "গ্রামীণ ভ্রমণ",
  "Rural Tours": "পল্লী ভ্রমণ",
  "Local Support": "স্থানীয় সহায়তা",
  "Safe Travel": "নিরাপদ ভ্রমণ",
  "Emergency First Aid": "জরুরি প্রাথমিক চিকিৎসা",
  "Tour Safety": "ভ্রমণ নিরাপত্তা",
  "Certified Tour Guide": "সার্টিফাইড ট্যুর গাইড",
  "First Aid": "প্রাথমিক চিকিৎসা"
};

// Translate UI key
export function t(key: string, isBangla: boolean, variables?: Record<string, string | number>): string {
  const lang = isBangla ? 'bn' : 'en';
  let text = UI_TRANSLATIONS[lang][key] || UI_TRANSLATIONS['en'][key] || key;
  
  if (variables) {
    Object.keys(variables).forEach((varKey) => {
      text = text.replace(new RegExp(`\\{${varKey}\\}`, 'g'), String(variables[varKey]));
    });
  }
  return text;
}

// Translate general single word (e.g. Free, Available, etc.)
export function translateGeneral(word: string, isBangla: boolean): string {
  if (!isBangla) return word;
  return GENERAL_TRANSLATIONS[word] || word;
}

// Translate specialty
export function translateSpecialty(spec: string, isBangla: boolean): string {
  if (!isBangla || !spec) return spec || '';
  return SPECIALTY_TRANSLATIONS[spec] || spec;
}

// Translate Division Name
export function translateDivision(div: string, isBangla: boolean): string {
  if (!isBangla || !div) return div || '';
  return DIVISION_TRANSLATIONS[div]?.name || div;
}

// Translate Division Tagline
export function translateDivisionTagline(div: string, isBangla: boolean, defaultTagline: string): string {
  if (!isBangla || !div) return defaultTagline || '';
  return DIVISION_TRANSLATIONS[div]?.tagline || defaultTagline;
}

// Translate Category
export function translateCategory(cat: string, isBangla: boolean): string {
  if (!isBangla || !cat) return cat || '';
  return CATEGORY_TRANSLATIONS[cat] || cat;
}

// Translate Budget Type
export function translateBudgetType(budget: string, isBangla: boolean): string {
  if (!isBangla || !budget) return budget || '';
  return BUDGET_TRANSLATIONS[budget] || budget;
}

// Translate destination name only (for partial objects like daily schedule labels)
export function translateDestinationName(name: any, isBangla: boolean): string {
  if (!isBangla || !name || typeof name !== 'string') return name || '';
  const direct = DEST_DATA_TRANSLATIONS[name]?.name;
  if (direct) return direct;
  // Handle composite labels e.g. "Cox's Bazar Beach — Departure" or "Spot A এবং Spot B"
  const departureSuffix = ' — প্রস্থান';
  if (name.endsWith(departureSuffix)) {
    const baseName = name.slice(0, -departureSuffix.length);
    const translatedBase = DEST_DATA_TRANSLATIONS[baseName]?.name || baseName;
    return `${translatedBase}${departureSuffix}`;
  }
  if (name.includes(' এবং ')) {
    return name
      .split(' এবং ')
      .map((part) => DEST_DATA_TRANSLATIONS[part.trim()]?.name || part.trim())
      .join(' এবং ');
  }
  return name;
}

// Dynamic Destination Translation Wrapper
export function translateDestination(dest: any, isBangla: boolean): any {
  if (!dest) {
    return {
      name: '',
      description: '',
      fullHistory: '',
      division: '',
      categories: [],
      safetyTips: [],
      nearbyFood: [],
      bestTimeToVisit: { season: '', timeOfDay: '' }
    };
  }
  if (!isBangla) return dest;
  const translation = dest.name ? DEST_DATA_TRANSLATIONS[dest.name] : undefined;
  
  const translatedDest = {
    ...dest,
    name: translation?.name || translateDestinationName(dest.name, isBangla),
    description: translation?.description || dest.description || '',
    fullHistory: translation?.fullHistory || dest.fullHistory || '',
    division: dest.division ? translateDivision(dest.division, isBangla) : (dest.division || ''),
    categories: Array.isArray(dest.categories)
      ? dest.categories.map((c: string) => translateCategory(c, isBangla))
      : (dest.categories || []),
    estimatedVisitDuration: dest.estimatedVisitDuration 
      ? dest.estimatedVisitDuration.replace('hours', 'ঘণ্টা').replace('hour', 'ঘণ্টা').replace('minutes', 'মিনিট').replace('minute', 'মিনিট').replace('Hours', 'ঘণ্টা').replace('Hour', 'ঘণ্টা')
      : (dest.estimatedVisitDuration || '')
  };

  if (dest.bestTimeToVisit) {
    let season = dest.bestTimeToVisit.season || '';
    let timeOfDay = dest.bestTimeToVisit.timeOfDay || '';
    if (isBangla) {
      if (season && season.includes('Winter')) season = 'শীতকাল (অক্টোবর থেকে মার্চ)';
      else if (season && season.includes('October to March')) season = 'অক্টোবর থেকে মার্চ (শীতকাল)';
      else if (season && season.includes('November to February')) season = 'নভেম্বর থেকে ফেব্রুয়ারি';
      
      if (timeOfDay) {
        timeOfDay = timeOfDay
          .replace('Early morning', 'খুব সকালে')
          .replace('morning', 'সকালে')
          .replace('Evening', 'সন্ধ্যায়')
          .replace('Afternoon', 'বিকালে')
          .replace('Late afternoon', 'বিকালে সূর্যাস্তের আগে')
          .replace('for beautiful light', 'চমৎকার আলোর জন্য')
          .replace('to avoid crowds', 'ভিড় এড়াতে')
          .replace('and enjoy golden light', 'এবং সোনালী আলো উপভোগ করতে')
          .replace('before prayers', 'নামাজের পূর্বে')
          .replace('after cooler sunrise hours', 'ভোরের ঠান্ডা আবহাওয়ার পর');
      }
    }
    translatedDest.bestTimeToVisit = {
      season,
      timeOfDay
    };
  }

  if (Array.isArray(dest.safetyTips)) {
    translatedDest.safetyTips = dest.safetyTips.map((tip: string) => {
      if (isBangla && tip) {
        if (tip.includes('belongings secure') || tip.includes('valuables secure')) return 'আপনার মূল্যবান জিনিসপত্র ও ব্যাগ নিরাপদে রাখুন।';
        if (tip.includes('Dress modestly') || tip.includes('Dress conservatively')) return 'শালীন পোশাক পরিধান করুন।';
        if (tip.includes('Remove shoes')) return 'পাদুকা বা জুতো খুলে প্রবেশ করুন।';
        if (tip.includes('prayer times')) return 'নামাজ বা প্রার্থনার সময়ের দিকে খেয়াল রাখুন ও সম্মান করুন।';
        if (tip.includes('taxis') || tip.includes('transport')) return 'নিরাপদ ও নিবন্ধিত যানবাহনে যাতায়াত করুন।';
        if (tip.includes('water') || tip.includes('hydrated')) return 'পর্যাপ্ত পানি পান করুন এবং রোদ চশমা ব্যবহার করুন।';
        return 'ঐতিহাসিক ও ধর্মীয় মূল্যবোধের প্রতি শ্রদ্ধাশীল থাকুন।';
      }
      return tip;
    });
  } else {
    translatedDest.safetyTips = dest.safetyTips || [];
  }

  if (Array.isArray(dest.nearbyFood)) {
    translatedDest.nearbyFood = dest.nearbyFood.map((food: any) => {
      let translatedName = food?.name || '';
      let translatedDesc = food?.description || '';
      if (isBangla && food?.name) {
        if (food.name.includes('Biryani')) {
          translatedName = 'ঐতিহ্যবাহী কাচ্চি বিরিয়ানি';
          translatedDesc = 'পুরান ঢাকার বিখ্যাত ও সুস্বাদু কাচ্চি বিরিয়ানি।';
        } else if (food.name.includes('Kebab')) {
          translatedName = 'সুস্বাদু কাবাব';
          translatedDesc = 'ঐতিহ্যবাহী শিক কাবাব ও পরোটা।';
        } else if (food.name.includes('Pani Puri') || food.name.includes('street food')) {
          translatedName = 'ফুচকা ও চটপটি';
          translatedDesc = 'স্থানীয় স্ট্রিট ফুড ও সুস্বাদু টক পানি।';
        } else if (food.name.includes('Cafe') || food.name.includes('Tea House')) {
          translatedName = 'স্থানীয় ক্যাফে ও চা চক্র';
          translatedDesc = 'হালকা নাস্তা, চা ও রিফ্রেশমেন্টের ব্যবস্থা।';
        } else if (food.name.includes('Sweets')) {
          translatedName = 'ঐতিহ্যবাহী মিষ্টি সামগ্রী';
          translatedDesc = 'স্থানীয় সুস্বাদু ছানার মিষ্টি ও দই।';
        } else {
          translatedName = 'স্থানীয় বিশেষ রেস্তোরাঁ';
          translatedDesc = 'চমৎকার দেশী মাছ-ভাত ও ভর্তার আয়োজন।';
        }
      }
      return {
        ...food,
        name: translatedName,
        description: translatedDesc
      };
    });
  } else {
    translatedDest.nearbyFood = dest.nearbyFood || [];
  }

  return translatedDest;
}

// Translate Hotel
export function translateHotel(hotel: any, isBangla: boolean): any {
  if (!hotel) {
    return { name: '', description: '', division: '', amenities: [] };
  }
  if (!isBangla) return hotel;
  const translation = hotel.name ? HOTEL_TRANSLATIONS[hotel.name] : undefined;
  
  return {
    ...hotel,
    name: translation?.name || hotel.name,
    description: translation?.description || hotel.description || '',
    division: hotel.division ? translateDivision(hotel.division, isBangla) : (hotel.division || ''),
    amenities: Array.isArray(hotel.amenities) ? hotel.amenities.map((a: string) => {
      if (a === 'Beach Access') return 'সৈকত অ্যাক্সেস';
      if (a === 'Swimming Pool') return 'সুইমিং পুল';
      if (a === 'Restaurant') return 'রেস্তোরাঁ';
      if (a === 'WiFi') return 'ওয়াই-ফাই';
      if (a === 'AC Rooms') return 'এসি রুম';
      if (a === 'Spa') return 'স্পা';
      if (a === 'Mountain Views') return 'পাহাড় ভিউ';
      if (a === 'Nature Trail Access') return 'প্রাকৃতিক ট্রেইল';
      if (a === 'Bonfire Area') return 'ক্যাম্পফায়ার জোন';
      if (a === 'Budget Friendly') return 'বাজেট বান্ধব';
      return a;
    }) : (hotel.amenities || [])
  };
}

// Translate Tour Guide
export function translateTourGuide(guide: any, isBangla: boolean): any {
  if (!guide) return guide;
  if (!isBangla) return guide;
  const bioTrans = guide.name ? INDIVIDUAL_GUIDE_TRANSLATIONS[guide.name] : undefined;
  
  return {
    ...guide,
    name: bioTrans?.name || guide.name,
    bio: bioTrans?.bio || guide.bio || '',
    location: guide.location ? translateDivision(guide.location, isBangla) : '',
    languages: Array.isArray(guide.languages) ? guide.languages.map((l: string) => translateGeneral(l, isBangla)) : (guide.languages || []),
    specialization: Array.isArray(guide.specialization) ? guide.specialization.map((s: string) => translateSpecialty(s, isBangla)) : (guide.specialization || [])
  };
}

// Translate Guide Agency
export function translateGuideAgency(agency: any, isBangla: boolean): any {
  if (!agency) return agency;
  if (!isBangla) return agency;
  const trans = agency.name ? GUIDE_TRANSLATIONS[agency.name] : undefined;
  
  return {
    ...agency,
    name: trans?.name || agency.name,
    shortDescription: trans?.shortDescription || agency.shortDescription || '',
    fullDescription: trans?.fullDescription || agency.fullDescription || '',
    division: agency.division ? translateDivision(agency.division, isBangla) : '',
    coveredDestinations: Array.isArray(agency.coveredDestinations) ? agency.coveredDestinations.map((d: string) => {
      const translation = DEST_DATA_TRANSLATIONS[d];
      return translation?.name || d;
    }) : (agency.coveredDestinations || []),
    guides: Array.isArray(agency.guides) ? agency.guides.map((g: any) => translateTourGuide(g, isBangla)) : (agency.guides || [])
  };
}

// Translate Nearby Attraction
export function translateNearbyAttraction(attraction: any, isBangla: boolean): any {
  if (!attraction) {
    return { name: '', description: '', whyVisit: '', visitDuration: '', localTransport: '', travelTime: '', localFood: [] };
  }
  if (!isBangla) return attraction;
  const trans = attraction.name ? ATTRACTION_TRANSLATIONS[attraction.name] : undefined;
  
  const translated = {
    ...attraction,
    name: trans?.name || attraction.name,
    description: trans?.description || attraction.description || '',
    whyVisit: trans?.whyVisit || attraction.whyVisit || '',
    visitDuration: attraction.visitDuration ? attraction.visitDuration.replace('hours', 'ঘণ্টা').replace('hour', 'ঘণ্টা').replace('minutes', 'মিনিট').replace('min', 'মিনিট') : (attraction.visitDuration || ''),
    localTransport: isBangla && attraction.localTransport
      ? attraction.localTransport
        .replace('Walking', 'পায়ে হেঁটে')
        .replace('walk', 'হাঁটা পথ')
        .replace('Rickshaw', 'রিকশা')
        .replace('CNG', 'সিএনজি')
        .replace('Auto-rickshaw', 'অটো-রিকশা')
        .replace('Motorcycle taxi', 'মোটরসাইকেল ট্যাক্সি')
        .replace('boat', 'নৌকা')
        .replace('Boat', 'নৌকা')
        .replace('Jeep', 'জিপ/চাঁদের গাড়ি')
        .replace('Reserved', 'রিজার্ভড')
      : (attraction.localTransport || ''),
    travelTime: isBangla && attraction.travelTime
      ? attraction.travelTime
        .replace('walk', 'হাঁটা')
        .replace('min', 'মিনিট')
        .replace('hour', 'ঘণ্টা')
        .replace('from', 'থেকে')
        .replace('centre', 'কেন্দ্র')
        .replace('town', 'শহর')
        .replace('en route to', 'যাওয়ার পথে')
      : (attraction.travelTime || ''),
    localFood: Array.isArray(attraction.localFood) ? attraction.localFood.map((food: string) => {
      if (isBangla && food) {
        if (food.includes('fish') || food.includes('Seafood') || food.includes('prawn')) return 'তাজা সামুদ্রিক মাছ ভাজা ও চিংড়ি কারি';
        if (food.includes('Coconut')) return 'চিঁড়ে ও তাজা ডাবের পানি';
        if (food.includes('tea') || food.includes('Tea')) return 'রং চা ও প্রাতিষ্ঠানিক পাহাড়ি চা';
        if (food.includes('sweets') || food.includes('sweet') || food.includes('Pita') || food.includes('rice cakes')) return 'ঐতিহ্যবাহী পিঠা ও মিষ্টি';
        if (food.includes('Bamboo') || food.includes('bamboo')) return 'পাহাড়ি ব্যাম্বু চিকেন ও ব্যাম্বু রাইস';
        if (food.includes('Oranges') || food.includes('oranges') || food.includes('pineapple') || food.includes('Mangoes')) return 'তাজা পাহাড়ি ফল';
        return 'স্থানীয় ঐতিহ্যবাহী খাবার';
      }
      return food;
    }) : (attraction.localFood || [])
  };
  
  return translated;
}
export function translateActivity(act: string, isBangla: boolean, hotelName: string = ''): string {
  if (!isBangla) return act;
  if (act.includes('Arrive & check-in at')) {
    return `পৌঁছান এবং ${hotelName || 'হোটেল'}-এ চেক-ইন করুন।`;
  }
  if (act.includes('Enjoy a welcome dinner')) {
    return 'স্থানীয় সি-ফুড বা ঐতিহ্যবাহী রেস্তোরাঁয় স্বাগত ডিনার উপভোগ করুন।';
  }
  if (act.includes('Lunch at a traditional local eatery')) {
    return 'ঐতিহ্যবাহী স্থানীয় ভোজনশালায় দুপুরের খাবার উপভোগ করুন';
  }
  if (act.includes('Depart from starting location')) {
    return 'যাত্রা শুরুর স্থান থেকে রওনা হন';
  }
  if (act.includes('Dinner & evening stroll near hotel')) {
    return 'হোটেলের কাছাকাছি রাতের খাবার এবং সান্ধ্যকালীন হাঁটাচলা';
  }
  if (act.includes('Early morning visit to a final attraction')) {
    return 'ভোরে একটি শেষ আকর্ষণে ভ্রমণ করুন।';
  }
  if (act.includes('Souvenir shopping at local markets')) {
    return 'স্থানীয় বাজারে স্মৃতিচিহ্ন কেনাকাটা।';
  }
  if (act.includes('Hotel check-out and journey back home')) {
    return 'হোটেল চেক-আউট এবং বাড়ির উদ্দেশ্যে যাত্রা।';
  }
  if (act.includes('Breakfast at hotel')) {
    return 'হোটেল থেকে সকালের নাস্তা করুন';
  }
  if (act.includes('Local craft & souvenir shopping')) {
    return 'স্থানীয় কারুশিল্প ও স্মৃতিচিহ্ন কেনাকাটা';
  }
  if (act.includes('Checkout from hotel')) {
    return 'হোটেল থেকে চেক-আউট করুন';
  }
  if (act.includes('Final lunch at a favourite local spot')) {
    return 'প্রিয় স্থানীয় কোনো স্পটে দুপুরের শেষ খাবার';
  }
  if (act.includes('Depart for home')) {
    return 'বাড়ির উদ্দেশ্যে রওনা হন';
  }
  if (act.includes('Arrive home')) {
    return 'বাড়িতে পৌঁছান — ট্রিপ সমাপ্ত!';
  }
  if (act.includes('Full day exploration of')) {
    const cleaned = act.replace('Full day exploration of', '').replace('surroundings.', '');
    return `${cleaned.trim()}-এর আশেপাশের এলাকায় সারাদিন অন্বেষণ করুন।`;
  }
  if (act.includes('Engage in local activities')) {
    return 'স্থানীয় ক্রিয়াকলাপ, ট্র্যাকিং, বোটিং বা সাংস্কৃতিক ভ্রমণে অংশ নিন।';
  }
  if (act.includes('Sample traditional street food')) {
    return 'ঐতিহ্যবাহী স্ট্রিট ফুড এবং স্থানীয় বিশেষ খাবার চেখে দেখুন।';
  }
  if (act.includes('Lunch break — try:')) {
    return act.replace('Lunch break — try:', 'দুপুরের খাবারের বিরতি — ট্রাই করুন:');
  }
  if (act.includes('Dinner — try:')) {
    return act.replace('Dinner — try:', 'রাতের খাবার — ট্রাই করুন:');
  }
  return act;
}

