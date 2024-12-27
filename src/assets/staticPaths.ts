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
              { x: 10, y: 10 },
              { x: 10, y: 20 },
              { x: 20, y: 20 },
              { x: 20, y: 10 },
            ],
            color: 'red',
            data: {
              name: 'Compound A',
              type: 'Residential',
              floors: 10,
              area: '5000 sqm',
              occupancy: '80%',
            },
          },
          {
            Cordinates: [
              { x: 30, y: 30 },
              { x: 30, y: 40 },
              { x: 40, y: 40 },
              { x: 40, y: 30 },
            ],
            color: 'blue',
            data: {
              name: 'Compound B',
              type: 'Commercial',
              floors: 5,
              area: '3000 sqm',
              occupancy: '95%',
            },
          },
        ],
      },
    ],
  },
];
