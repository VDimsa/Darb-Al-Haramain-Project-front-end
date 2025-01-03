import { ApartmentStatus, Building, BuildingStatus } from "../app/shared/models/building.model";
import { Project, PointTypeEnum, ProjectsMap } from "../app/shared/projects-dashboard/project.model";

export const staticProjects: Project[] = [
  {
    id: 1,
    name: 'مشروع درب الحرمين',
    autoScroll: { x: 15, y: 18 },
    mapImage: 'https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733557106/inv4kki12ltoa7fqoupo.webp',
    points: [
      {
        id: 1,
        type: PointTypeEnum.PROJECT,
        position: { x: 39, y: 48 },
        pointMap: 'https://res.cloudinary.com/dmyhr9fcz/image/upload/v1734692691/tvpmiqqevedzbcpcd1bz.webp',
        name: '',
        logo: "https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733559930/ogx0jgirrgqrjq70gjed.ico",
        isProject: true,
        borders: [
          {
            Cordinates: [
              { x: 42.65, y: 46.9794205448436 },
              { x: 41.4, y: 48.36388283987828 },
              { x: 39.5, y: 51.040509943612 },
              { x: 37.45, y: 49.563750162241675 },
              { x: 37.15, y: 49.563750162241675 },
              { x: 37, y: 49.563750162241675 },
              { x: 36.7, y: 49.102262730563446 },
              { x: 36.6, y: 48.73307278522086 },
              { x: 35.65, y: 46.79482557217231 },
              { x: 40.25, y: 44.39509092744552 },
              { x: 40.4, y: 45.31806579080198 },
              { x: 40.55, y: 45.59495824980891 },
              { x: 40.7, y: 45.9641481951515 },
              { x: 41.05, y: 46.24104065415843 },
            ],
            visible: true,
            data: {
              name: 'Project Main Border',
            },
          },
        ],
        paths: [
          {
            point: {
              id: 2, type: PointTypeEnum.HOSPITAL, position: { x: 60, y: 32 }, name: "",
              isProject: false,
              visible: true,
              importance: 0
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 45, y: 42 },
              { id: 3, x: 50, y: 37 },
              { id: 4, x: 55, y: 35 },
              { id: 5, x: 60, y: 32 }
            ]
          },
          {
            point: {
              id: 3, type: PointTypeEnum.HOSPITAL, position: { x: 69, y: 61 }, name: "",
              isProject: false,
              visible: true,
              importance: 0
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 45, y: 55 },
              { id: 3, x: 55, y: 58 },
              { id: 4, x: 64, y: 60 },
              { id: 5, x: 69, y: 61 }
            ]
          },
          {
            point: {
              id: 4, type: PointTypeEnum.HOSPITAL, position: { x: 28, y: 40 }, name: "",
              isProject: false,
              visible: true,
              importance: 0
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 35, y: 45 },
              { id: 3, x: 30, y: 42 },
              { id: 4, x: 28, y: 40 }
            ]
          },
          {
            point: {
              id: 5, type: PointTypeEnum.MALL, position: { x: 54.3, y: 30 }, name: "",
              isProject: false,
              visible: true,
              importance: 0
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 45, y: 40 },
              { id: 3, x: 50, y: 35 },
              { id: 4, x: 54.3, y: 30 }
            ]
          },
          {
            point: {
              id: 6, type: PointTypeEnum.MALL, position: { x: 63, y: 29 }, name: "",
              isProject: false,
              visible: true,
              importance: 0
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 50, y: 38 },
              { id: 3, x: 58, y: 32 },
              { id: 4, x: 63, y: 29 }
            ]
          },
          {
            point: {
              id: 7, type: PointTypeEnum.MALL, position: { x: 29, y: 52 }, name: "",
              isProject: false,
              visible: true,
              importance: 0
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 34, y: 50 },
              { id: 3, x: 30, y: 51 },
              { id: 4, x: 29, y: 52 }
            ]
          },
          {
            point: {
              id: 8, type: PointTypeEnum.RESTAURANT, position: { x: 42, y: 37 }, name: "",
              isProject: false,
              visible: true,
              importance: 0
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 40, y: 42 },
              { id: 3, x: 41, y: 38 },
              { id: 4, x: 42, y: 37 }
            ]
          },
          {
            point: {
              id: 9, type: PointTypeEnum.SCHOOL, position: { x: 75, y: 51 }, name: "",
              isProject: false,
              visible: true,
              importance: 0
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 50, y: 50 },
              { id: 3, x: 60, y: 55 },
              { id: 4, x: 70, y: 50 },
              { id: 5, x: 75, y: 51 }
            ]
          }
        ],
        visible: true,
        importance: 2
      },
      {
        id: 2,
        type: PointTypeEnum.HOSPITAL,
        position: { x: 60, y: 32 },
        name: '',
        logo: "https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733559930/ogx0jgirrgqrjq70gjed.ico",
        isProject: false,
        visible: true,
        importance: 1
      },
      {
        id: 3,
        type: PointTypeEnum.HOSPITAL,
        position: { x: 69, y: 61 },
        name: '',
        logo: "https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733559930/ogx0jgirrgqrjq70gjed.ico",
        isProject: false,
        visible: true,
        importance: 1
      },
      {
        id: 4,
        type: PointTypeEnum.HOSPITAL,
        position: { x: 28, y: 40 },
        name: '',
        isProject: false,
        visible: true,
        importance: 0
      },
      {
        id: 5,
        type: PointTypeEnum.MALL,
        position: { x: 54.3, y: 30 },
        name: '',
        isProject: false,
        visible: true,
        importance: 0
      },
      {
        id: 6,
        type: PointTypeEnum.MALL,
        position: { x: 63, y: 29 },
        name: '',
        isProject: false,
        visible: true,
        importance: 0
      },
      {
        id: 7,
        type: PointTypeEnum.MALL,
        position: { x: 29, y: 52 },
        name: '',
        isProject: false,
        visible: true,
        importance: 0
      },
      {
        id: 8,
        type: PointTypeEnum.RESTAURANT,
        position: { x: 42, y: 37 },
        name: '',
        isProject: false,
        visible: true,
        importance: 0
      },
      {
        id: 9,
        type: PointTypeEnum.SCHOOL,
        position: { x: 75, y: 51 },
        name: '',
        isProject: false,
        visible: true,
        importance: 0
      },
    ],
  },
];

export const alharamenProjectMap: ProjectsMap[] = [
  {
    projectId: 1,
    pointId: 1,
    mapImage: 'https://res.cloudinary.com/dmyhr9fcz/image/upload/v1734692691/tvpmiqqevedzbcpcd1bz.webp',
    data: [
      {
        data: {
          code: '123',
        },
        borders: [
          {
            Cordinates: [
              {
                "x": 20.260223048327138,
                "y": 20.710059171597635
              },
              {
                "x": 19.941582580987784,
                "y": 19.349112426035504
              },
              {
                "x": 19.861922464152947,
                "y": 19.230769230769234
              },
              {
                "x": 19.861922464152947,
                "y": 19.053254437869825
              },
              {
                "x": 18.295273499734467,
                "y": 15.266272189349111
              },
              {
                "x": 16.064790228359,
                "y": 16.331360946745562
              },
              {
                "x": 15.985130111524162,
                "y": 17.27810650887574
              },
              {
                "x": 17.63143919277748,
                "y": 21.06508875739645
              },
              {
                "x": 17.950079660116835,
                "y": 21.420118343195266
              }
            ],
            visible: true,
            color: 'red',
            data: {
              name: 'المجمع السكني A',
              type: 'سكني',
              floors: 10,
              area: '5000 م²',
              occupancy: '80%',
            },
          },
          {
            Cordinates: [
              {
                "x": 20.260223048327138,
                "y": 20.650887573964496
              },
              {
                "x": 18.268720127456188,
                "y": 15.266272189349111
              },
              {
                "x": 20.57886351566649,
                "y": 14.615384615384617
              },
              {
                "x": 20.738183749336166,
                "y": 14.437869822485208
              },
              {
                "x": 21.37546468401487,
                "y": 15.562130177514794
              },
              {
                "x": 22.14551248008497,
                "y": 17.041420118343193
              },
              {
                "x": 22.464152947424324,
                "y": 18.402366863905325
              },
              {
                "x": 22.517259691980883,
                "y": 18.461538461538463
              },
              {
                "x": 22.525000000000002,
                "y": 18.439950905719833
              },
              {
                "x": 22.675,
                "y": 18.71850001305699
              },
              {
                "x": 22.675,
                "y": 18.82991965599185
              },
              {
                "x": 22.825,
                "y": 19.55414733506846
              }
            ],
            visible: true,
            color: 'blue',
            data: {
              name: 'المجمع التجاري B',
              type: 'تجاري',
              floors: 5,
              area: '3000 م²',
              occupancy: '95%',
            },
          },
          {
            Cordinates: [
              {
                "x": 22.925,
                "y": 19.721276799470758
              },
              {
                "x": 22.575,
                "y": 18.495660727187264
              },
              {
                "x": 22.400000000000002,
                "y": 18.217111619850108
              },
              {
                "x": 22.2,
                "y": 16.88007590463175
              },
              {
                "x": 21.375,
                "y": 15.208781260608802
              },
              {
                "x": 21.45,
                "y": 14.930232153271646
              },
              {
                "x": 23.425,
                "y": 14.317424117129898
              },
              {
                "x": 23.5,
                "y": 14.373133938597332
              },
              {
                "x": 24.45,
                "y": 16.15584822555514
              },
              {
                "x": 24.65,
                "y": 16.657236618762024
              },
              {
                "x": 24.95,
                "y": 16.768656261696886
              },
              {
                "x": 25.2,
                "y": 17.548593762240927
              },
              {
                "x": 25.7,
                "y": 18.217111619850108
              },
              {
                "x": 25.3,
                "y": 18.82991965599185
              },
              {
                "x": 24.5,
                "y": 19.108468763329007
              }
            ],
            visible: true,
            color: 'green',
            data: {
              name: 'العيادات الطبية C',
              type: 'عيادات',
              floors: 8,
              area: '2200 م²',
              occupancy: '100%',
            },
          },
          {
            Cordinates: [
              {
                "x": 25.7,
                "y": 18.27282144131754
              },
              {
                "x": 25.15,
                "y": 17.325754476371202
              },
              {
                "x": 24.75,
                "y": 16.824366083164318
              },
              {
                "x": 24.075,
                "y": 14.985941974739077
              },
              {
                "x": 23.5,
                "y": 14.317424117129898
              },
              {
                "x": 23.549999999999997,
                "y": 13.59319643805329
              },
              {
                "x": 23.674999999999997,
                "y": 13.2589375092487
              },
              {
                "x": 25.5,
                "y": 12.311870544302366
              },
              {
                "x": 25.900000000000002,
                "y": 13.036098223378975
              },
              {
                "x": 26.224999999999998,
                "y": 13.53748661658586
              },
              {
                "x": 26.325,
                "y": 13.871745545390448
              },
              {
                "x": 26.575,
                "y": 13.98316518832531
              },
              {
                "x": 28.000000000000004,
                "y": 17.158625011968905
              }
            ],
            visible: true,
            color: 'orange',
            data: {
              name: 'مركز التسوق D',
              type: 'تسوق',
              floors: 3,
              area: '6000 م²',
              occupancy: '90%',
            },
          },
          {
            Cordinates: [
              {
                "x": 28.025,
                "y": 17.102915190501474
              },
              {
                "x": 26.575,
                "y": 13.98316518832531
              },
              {
                "x": 26.375,
                "y": 13.871745545390448
              },
              {
                "x": 26.200000000000003,
                "y": 13.426066973650997
              },
              {
                "x": 26.200000000000003,
                "y": 13.426066973650997
              },
              {
                "x": 25.8,
                "y": 12.590419651639523
              },
              {
                "x": 25.874999999999996,
                "y": 12.256160722834933
              },
              {
                "x": 27.925,
                "y": 11.531933043758325
              },
              {
                "x": 30.15,
                "y": 14.874522331804215
              },
              {
                "x": 30.5,
                "y": 15.598750010880824
              },
              {
                "x": 30.375000000000004,
                "y": 15.765879475283118
              },
              {
                "x": 30.5,
                "y": 16.15584822555514
              },
              {
                "x": 30.275000000000002,
                "y": 16.378687511424868
              },
              {
                "x": 29.799999999999997,
                "y": 16.768656261696886
              }
            ],
            visible: true,
            color: 'brown',
            data: {
              name: 'المبنى السكني E',
              type: 'سكني',
              floors: 6,
              area: '4000 م²',
              occupancy: '50%',
            },
          },
        ],
      },
    ],
  },
];

export const staticBuildings: Building[] = [
  {
    id: 1,
    name: 'مبنى الأطباء',
    status: BuildingStatus.ACTIVE,
    compoundId: 1,
    urlVideo: true,
    url: 'https://res.cloudinary.com/dmyhr9fcz/video/upload/v1735395219/kmjmcboyukqbw4gjbjeg.mp4',
    location: {
      address: 'المدينة المنورة',
      city: 'المدينة المنورة',
      state: 'المدينة المنورة',
      country: 'المملكة العربية السعودية',
      latitude: 24.470901,
      longitude: 39.612236,
    },
    floors: [
      {
        floorNumber: 1,
        apartments: [
          {
            id: 1,
            number: '101',
            roomsCount: 3,
            status: ApartmentStatus.AVAILABLE,
            floorNumber: 1,
            buildingId: 1,
            border: {
              coordinates: [
                { x: 10, y: 10 },
                { x: 10, y: 60 },
                { x: 80, y: 60 },
                { x: 80, y: 10 }
              ],
              color: 'green',
              visible: true
            },
            name: ""
          },
          {
            id: 2,
            number: '102',
            roomsCount: 2,
            status: ApartmentStatus.BOOKED,
            floorNumber: 1,
            buildingId: 1,
            border: {
              coordinates: [
                { x: 90, y: 10 },
                { x: 90, y: 60 },
                { x: 160, y: 60 },
                { x: 160, y: 10 }
              ],
              color: 'yellow',
              visible: true
            },
            name: ""
          },
          {
            id: 3,
            number: '103',
            roomsCount: 4,
            status: ApartmentStatus.SOLD,
            floorNumber: 1,
            buildingId: 1,
            border: {
              coordinates: [
                { x: 170, y: 10 },
                { x: 170, y: 60 },
                { x: 240, y: 60 },
                { x: 240, y: 10 }
              ],
              color: 'red',
              visible: true
            },
            name: ""
          },
        ],
      },
      {
        floorNumber: 2,
        apartments: [
          {
            id: 4,
            number: '201',
            roomsCount: 3,
            status: ApartmentStatus.AVAILABLE,
            floorNumber: 2,
            buildingId: 1,
            border: {
              coordinates: [
                { x: 10, y: 70 },
                { x: 10, y: 120 },
                { x: 80, y: 120 },
                { x: 80, y: 70 }
              ],
              color: 'green',
              visible: true
            },
            name: ""
          },
          {
            id: 5,
            number: '202',
            roomsCount: 2,
            status: ApartmentStatus.BOOKED,
            floorNumber: 2,
            buildingId: 1,
            border: {
              coordinates: [
                { x: 90, y: 70 },
                { x: 90, y: 120 },
                { x: 160, y: 120 },
                { x: 160, y: 70 }
              ],
              color: 'yellow',
              visible: true
            },
            name: ""
          },
          {
            id: 6,
            number: '203',
            roomsCount: 4,
            status: ApartmentStatus.SOLD,
            floorNumber: 2,
            buildingId: 1,
            border: {
              coordinates: [
                { x: 170, y: 70 },
                { x: 170, y: 120 },
                { x: 240, y: 120 },
                { x: 240, y: 70 }
              ],
              color: 'red',
              visible: true
            },
            name: ""
          },
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'مبنى الصيادلة',
    status: BuildingStatus.ACTIVE,
    compoundId: 1,
    urlVideo: true,
    url: 'https://res.cloudinary.com/dmyhr9fcz/video/upload/v1735395219/kmjmcboyukqbw4gjbjeg.mp4',
    location: {
      address: 'المدينة المنورة',
      city: 'المدينة المنورة',
      state: 'المدينة المنورة',
      country: 'المملكة العربية السعودية',
      latitude: 24.470901,
      longitude: 39.612236,
    },
    floors: [
      {
        floorNumber: 1,
        apartments: [
          {
            id: 7,
            number: '101',
            roomsCount: 3,
            status: ApartmentStatus.AVAILABLE,
            floorNumber: 1,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 10, y: 10 },
                { x: 10, y: 60 },
                { x: 80, y: 60 },
                { x: 80, y: 10 }
              ],
              color: 'green',
              visible: true
            },
            name: "شقة 101"
          }
        ],
      },
      {
        floorNumber: 2,
        apartments: [
          {
            id: 8,
            number: '201',
            roomsCount: 2,
            status: ApartmentStatus.BOOKED,
            floorNumber: 2,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 90, y: 10 },
                { x: 90, y: 60 },
                { x: 160, y: 60 },
                { x: 160, y: 10 }
              ],
              color: 'yellow',
              visible: true
            },
            name: "شقة 201"
          }
        ],
      },
      {
        floorNumber: 3,
        apartments: [
          {
            id: 9,
            number: '301',
            roomsCount: 4,
            status: ApartmentStatus.SOLD,
            floorNumber: 3,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 170, y: 10 },
                { x: 170, y: 60 },
                { x: 240, y: 60 },
                { x: 240, y: 10 }
              ],
              color: 'red',
              visible: true
            },
            name: "شقة 301"
          }
        ],
      },
      {
        floorNumber: 4,
        apartments: [
          {
            id: 10,
            number: '401',
            roomsCount: 3,
            status: ApartmentStatus.AVAILABLE,
            floorNumber: 4,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 10, y: 70 },
                { x: 10, y: 120 },
                { x: 80, y: 120 },
                { x: 80, y: 70 }
              ],
              color: 'green',
              visible: true
            },
            name: "شقة 401"
          }
        ],
      },
      {
        floorNumber: 5,
        apartments: [
          {
            id: 11,
            number: '501',
            roomsCount: 2,
            status: ApartmentStatus.BOOKED,
            floorNumber: 5,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 90, y: 70 },
                { x: 90, y: 120 },
                { x: 160, y: 120 },
                { x: 160, y: 70 }
              ],
              color: 'yellow',
              visible: true
            },
            name: "شقة 501"
          }
        ],
      },
      {
        floorNumber: 6,
        apartments: [
          {
            id: 12,
            number: '601',
            roomsCount: 4,
            status: ApartmentStatus.SOLD,
            floorNumber: 6,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 170, y: 70 },
                { x: 170, y: 120 },
                { x: 240, y: 120 },
                { x: 240, y: 70 }
              ],
              color: 'red',
              visible: true
            },
            name: "شقة 601"
          }
        ],
      },
      {
        floorNumber: 7,
        apartments: [
          {
            id: 13,
            number: '701',
            roomsCount: 3,
            status: ApartmentStatus.AVAILABLE,
            floorNumber: 7,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 10, y: 130 },
                { x: 10, y: 180 },
                { x: 80, y: 180 },
                { x: 80, y: 130 }
              ],
              color: 'green',
              visible: true
            },
            name: "شقة 701"
          }
        ],
      },
      {
        floorNumber: 8,
        apartments: [
          {
            id: 14,
            number: '801',
            roomsCount: 2,
            status: ApartmentStatus.BOOKED,
            floorNumber: 8,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 90, y: 130 },
                { x: 90, y: 180 },
                { x: 160, y: 180 },
                { x: 160, y: 130 }
              ],
              color: 'yellow',
              visible: true
            },
            name: "شقة 801"
          }
        ],
      },
      {
        floorNumber: 9,
        apartments: [
          {
            id: 15,
            number: '901',
            roomsCount: 4,
            status: ApartmentStatus.SOLD,
            floorNumber: 9,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 170, y: 130 },
                { x: 170, y: 180 },
                { x: 240, y: 180 },
                { x: 240, y: 130 }
              ],
              color: 'red',
              visible: true
            },
            name: "شقة 901"
          }
        ],
      },
      {
        floorNumber: 10,
        apartments: [
          {
            id: 16,
            number: '1001',
            roomsCount: 3,
            status: ApartmentStatus.AVAILABLE,
            floorNumber: 10,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 10, y: 190 },
                { x: 10, y: 240 },
                { x: 80, y: 240 },
                { x: 80, y: 190 }
              ],
              color: 'green',
              visible: true
            },
            name: "شقة 1001"
          }
        ],
      },
      {
        floorNumber: 11,
        apartments: [
          {
            id: 17,
            number: '1101',
            roomsCount: 2,
            status: ApartmentStatus.BOOKED,
            floorNumber: 11,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 90, y: 190 },
                { x: 90, y: 240 },
                { x: 160, y: 240 },
                { x: 160, y: 190 }
              ],
              color: 'yellow',
              visible: true
            },
            name: "شقة 1101"
          }
        ],
      },
      {
        floorNumber: 12,
        apartments: [
          {
            id: 18,
            number: '1201',
            roomsCount: 4,
            status: ApartmentStatus.SOLD,
            floorNumber: 12,
            buildingId: 2,
            border: {
              coordinates: [
                { x: 170, y: 190 },
                { x: 170, y: 240 },
                { x: 240, y: 240 },
                { x: 240, y: 190 }
              ],
              color: 'red',
              visible: true
            },
            name: "شقة 1201"
          }
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
