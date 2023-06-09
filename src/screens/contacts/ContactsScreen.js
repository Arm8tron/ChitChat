import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, Text, StyleSheet, View, SectionList, ScrollView, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import CustomColors from "../../CustomColors";
import Contacts from "react-native-contacts"
import ContactItem from "../../components/ContactItem";
import ContactSectionHeader from "../../components/ContactSectionHeader";
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

function ContactsScreen() {
    const sectionListRef = useRef()
    const [contacts, setContacts] = useState([])
    const [contactCount, setContactCount] = useState(0)


    useEffect(() => {
        if (Platform.OS == "android") {
			getPermission().then((permission) => {
				if (permission == "granted") {
                    console.log("android permission granted");
					fetchContactsList();
				}
			})
		} else {
			fetchContactsList();
		}
    }, []);

    async function getPermission() {
		return await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
			{
				'title': 'Contacts',
				'message': 'This app would like to view your contacts.',
				'buttonPositive': 'Please accept bare mortal'
			}
		)
	}

    function fetchContactsList() {
        try {
            Contacts
                .getAll()
                .then((newContacts) => {
                    let filteredContacts = [];
                    newContacts.forEach((contact) => { //Loop through newContacts and push the required values(if valid) to filteredContacts
                        if (contact.phoneNumbers?.length > 0) {
                            filteredContacts.push({
                                displayText: contact.givenName ? contact.givenName : contact.phoneNumbers[0].number,
                                givenName: contact.givenName,
                                phoneNumber: contact.phoneNumbers[0].number
                            })
                        }
                    });

                    filteredContacts = filteredContacts.filter(
                        (contact) => isSGContact(contact)
                    );

                    const groupedNames = groupNamesByFirstLetter(filteredContacts);

                    const numbers = extractNumbers(filteredContacts);

                    const sortedKeys = Object.keys(groupedNames).sort();

                    const result = sortedKeys.map(firstLetter => ({
                        'firstLetter': [firstLetter],
                        data: groupedNames[firstLetter]
                    })).concat({ 'firstLetter': ['#'], data: numbers });
                    setContactCount(filteredContacts.length)
                    setContacts(result)
                })
        } catch (e) {
            console.log(e)
        }
    }

    function handleIndexLetterPressed(sectionIndex) {
        sectionListRef.current.scrollToLocation({ sectionIndex, itemIndex: 0, animated: true })
    }
    _getItemLayout = sectionListGetItemLayout({
        // The height of the row with rowData at the given sectionIndex and rowIndex
        getItemHeight: (rowData, sectionIndex, rowIndex) => 64,

        // These three properties are optional
        getSeparatorHeight: () => 0, // The height of your separators
        getSectionHeaderHeight: () => 40, // The height of your section headers
        getSectionFooterHeight: () => 0, // The height of your section footers
    })

    function handleScrollIndexFailed(event) {
        console.log(event)
    }


    return <SafeAreaView style={styles.container}>
        <View style={styles.header}
        >
            <Text style={styles.headerText}> All </Text>
        </View>
        <View>
            <Text style={[styles.contactsCount, { display: contacts.length > 0 ? "flex" : "none" }]}>
                Total Contacts: {contactCount}
            </Text>
        </View>
        <View style={styles.sections}>
            <SectionList style={styles.sectionList}
                sections={contacts}
                renderItem={ContactItem}
                renderSectionHeader={ContactSectionHeader}
                ref={sectionListRef}
                getItemLayout={_getItemLayout}
                onScrollToIndexFailed={handleScrollIndexFailed}
            >
            </SectionList>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                {contacts.map((contact, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleIndexLetterPressed(index)}>
                        <Text>
                            {contact.firstLetter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

    </SafeAreaView>
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: CustomColors.primary,
        width: '100%',
        height: 48,
        alignItems: "center",
        justifyContent: "center"
    },
    sections: {
        flexDirection: "row",
        height: "100%"
    },
    sectionList: {
        width: '90%'
    },
    contactsCount: {
        margin: 16,
        alignSelf: "center"
    },
    headerText: {
        color: "white",
        fontSize: 18
    },
    scrollViewStyle: {
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 50
    }
})
const cleanContactNumber = (number) => {
    return number.replace(/[^0-9]/g, '');
}
function isSGContact(contact) {
    let phoneNumber = contact.phoneNumber
    let cleanedNumber = cleanContactNumber(phoneNumber)
    return phoneNumber.includes('+65') || (cleanedNumber.length == 8 && /^[689]/.test(cleanedNumber));
}

function groupNamesByFirstLetter(list) {
    const groups = {};

    for (let item of list) {
        const displayText = item.displayText;
        const firstLetter = displayText[0].toUpperCase();
        if (isNaN(firstLetter) && firstLetter != '+') {
            if (groups[firstLetter]) {
                groups[firstLetter].push(item);
            } else {
                groups[firstLetter] = [item];
            }
        }
    }

    return groups;
}

function extractNumbers(list) {
    return list.filter(item => !isNaN(item.displayText));
}
export default ContactsScreen;