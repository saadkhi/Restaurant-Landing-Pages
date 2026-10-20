import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function (req) {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    const name = clean(body.name, 80);
    const phone = clean(body.phone, 30);
    const email = clean(body.email, 120);
    const date = clean(body.date, 10);
    const time = clean(body.time, 12);
    const venue = clean(body.venue, 40) || 'No preference';
    const occasion = clean(body.occasion, 40) || 'Casual dining';
    const notes = clean(body.notes, 500);
    const guests = Number(body.guests);

    if (!name || !phone || !date || !time) {
      return Response.json(
        { error: 'Please add your name, phone number, date and time.' },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json({ error: 'Please choose a valid date.' }, { status: 400 });
    }

    if (!Number.isFinite(guests) || guests < 1 || guests > 60) {
      return Response.json(
        { error: 'Please choose between 1 and 60 guests.' },
        { status: 400 }
      );
    }

    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return Response.json({ error: 'Please check the email address.' }, { status: 400 });
    }

    const reference = 'KC-' + crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase();

    const record = await base44.asServiceRole.entities.Reservation.create({
      name,
      phone,
      email,
      date,
      time,
      guests,
      venue,
      occasion,
      notes,
      reference,
      status: 'new',
    });

    return Response.json({
      success: true,
      reference,
      date: record.date,
      time: record.time,
      guests: record.guests,
      venue: record.venue,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}