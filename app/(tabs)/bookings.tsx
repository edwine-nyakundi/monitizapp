import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, TouchableOpacity, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function BookingsScreen() {
  const [bookings, setBookings] = useState([]);
  const [cancelledTrips, setCancelledTrips] = useState([]);
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize date with today's date
  const [category, setCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // State to manage date picker visibility

  const addBooking = () => {
    if (to && from && date && category) {
      const newBooking = { to, from, date: date.toISOString().split('T')[0], category };
      setBookings([...bookings, newBooking]);
      setTo('');
      setFrom('');
      setDate(new Date()); // Reset date to today's date after adding booking
      setCategory('');
    }
  };

  const editBooking = (index, newTo, newFrom, newDate, newCategory) => {
    const updatedBookings = bookings.map((booking, i) =>
      i === index ? { to: newTo, from: newFrom, date: newDate, category: newCategory } : booking
    );
    setBookings(updatedBookings);
  };

  const cancelBooking = (index) => {
    // Move booking to cancelled trips
    const cancelledBooking = bookings[index];
    setCancelledTrips([...cancelledTrips, cancelledBooking]);
    // Remove booking from upcoming bookings
    setBookings([
      ...bookings.slice(0, index),
      ...bookings.slice(index + 1)
    ]);
  };

  const handleDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Hide DatePicker on iOS after selection
    setDate(currentDate);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E0D0C0', dark: '#503030' }}
      headerImage={<Ionicons size={310} name="calendar-outline" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bookings</ThemedText>
      </ThemedView>
      <ThemedText>Manage your bookings and reservations here.</ThemedText>
      
      <Collapsible title="Upcoming Bookings">
        <ScrollView style={styles.bookingForm}>
          <TextInput
            style={styles.input}
            placeholder="To"
            value={to}
            onChangeText={setTo}
          />
          <TextInput
            style={styles.input}
            placeholder="From"
            value={from}
            onChangeText={setFrom}
          />
          {/* Replace TextInput for Date with DateTimePicker */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              value={date.toISOString().split('T')[0]}
              editable={false}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          <Button title="Add Booking" onPress={addBooking} />
        </ScrollView>

        {bookings.map((booking, index) => (
          <ThemedView key={index} style={styles.bookingContainer}>
            <ThemedText style={styles.bookingTitle}>Booking #{index + 1}</ThemedText>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>To:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.to}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>From:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.from}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>Date:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.date}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>Category:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.category}</ThemedText>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={() => cancelBooking(index)}>
                <Ionicons name="close-outline" size={24} color="#FF3B30" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => editBooking(index, 'New To', 'New From', 'New Date', 'New Category')}>
                <Ionicons name="create-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </ThemedView>
        ))}

        <ExternalLink href="https://example.com/bookings/upcoming">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      
      <Collapsible title="Past Bookings">
        <ThemedText>
          Review past bookings and travel history.
        </ThemedText>
        <ExternalLink href="https://example.com/bookings/past">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Manage Reservations">
        {bookings.map((booking, index) => (
          <ThemedView key={index} style={styles.bookingContainer}>
            <ThemedText style={styles.bookingTitle}>Booking #{index + 1}</ThemedText>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>To:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.to}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>From:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.from}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>Date:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.date}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>Category:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.category}</ThemedText>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={() => cancelBooking(index)}>
                <Ionicons name="close-outline" size={24} color="#FF3B30" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => editBooking(index, 'New To', 'New From', 'New Date', 'New Category')}>
                <Ionicons name="create-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </ThemedView>
        ))}
      </Collapsible>

      <Collapsible title="Cancelled Trips">
        {cancelledTrips.map((booking, index) => (
          <ThemedView key={index} style={styles.bookingContainer}>
            <ThemedText style={styles.bookingTitle}>Booking #{index + 1}</ThemedText>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>To:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.to}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>From:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.from}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>Date:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.date}</ThemedText>
            </View>
            <View style={styles.bookingDetails}>
              <ThemedText style={styles.bookingLabel}>Category:</ThemedText>
              <ThemedText style={styles.bookingValue}>{booking.category}</ThemedText>
            </View>
          </ThemedView>
        ))}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  headerImage: {
    alignSelf: 'center',
  },
  bookingForm: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%', // Set a fixed width for input fields
    alignSelf: 'center',
  },
  bookingContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  bookingTitle: {
    fontWeight: 'bold',
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  bookingLabel: {
    fontWeight: 'bold',
  },
  bookingValue: {
    flexShrink: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    padding: 10,
  },
});
