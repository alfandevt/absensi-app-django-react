export const currentYears = new Date().getFullYear();
export const currentMonths = new Date().getMonth();

export const matchArrayOfDateToDate = (arrayDate = [], date2 = new Date()) => {
  return arrayDate.some(
    (item) =>
      item.jam.getDate() === date2.getDate() &&
      item.jam.getMonth() === date2.getMonth() &&
      item.jam.getFullYear() === date2.getFullYear()
  );
};

export const findAbsen = (arrayDate = [], date2 = new Date()) => {
  return arrayDate.find(
    (item) =>
      item.jam.getDate() === date2.getDate() &&
      item.jam.getMonth() === date2.getMonth() &&
      item.jam.getFullYear() === date2.getFullYear()
  );
};

export const convertAbsensiData = (
  absensiDetail = [],
  month,
  year,
  jamKerja = {}
) => {
  let dates = getAllDaysInMonth(year, month);
  console.log(absensiDetail);
  dates = dates.map((item) => {
    const objectData = {
      id: item.toUTCString(),
      date: item,
      keterangan: "Tidak Masuk",
      jamMasuk: "-",
    };

    if (item.getDay() === 0 || item.getDay() === 6) {
      objectData.keterangan = "Libur";
    }

    if (matchArrayOfDateToDate(absensiDetail, item)) {
      const absensi = findAbsen(absensiDetail, item);
      const jamAbsen = absensi.jam.toLocaleTimeString("it-It");

      if (jamAbsen > jamKerja.mulai) {
        objectData.keterangan = "Terlambat";
      } else {
        objectData.keterangan = "Masuk";
      }

      objectData.jamMasuk = absensi.jam.toLocaleTimeString();
    }

    return objectData;
  });
  return dates;
};

export const getAllDaysInMonth = (
  year = currentYears,
  month = currentMonths
) => {
  const date = new Date(year, month, 1);

  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getMonthOptions = (year = currentYears) => {
  const date = new Date(year, 0, 1);

  const months = [];

  while (date.getFullYear() === year) {
    months.push(new Date(date));
    date.setMonth(date.getMonth() + 1);
  }

  return months;
};

export const getYearOptions = (fromYear = 2019) => {
  const fromDate = new Date(fromYear, 0, 1);
  const currentDate = new Date(currentYears, 0, 1);

  const years = [];

  while (fromDate.getFullYear() <= currentDate.getFullYear()) {
    years.push(new Date(fromDate));
    fromDate.setFullYear(fromDate.getFullYear() + 1);
  }

  return years;
};

export const formatTime = (date) => {};

export const parseTime = (time) => {
  const [hours, minutes, seconds] = time.split(":");
  return [Number(hours), Number(minutes), Number(seconds)];
};
