type TCardData = { reverse?: boolean; img: { src: string; alt: string }; title: string; body: string }

export const cardsData: TCardData[] = [
    {
        img: { alt: 'easy use', src: '/img/undraw_thought_process_re_om58.svg' },
        title: 'Facilidad de Uso e Importación de Exámenes',
        body: 'Diseña exámenes de manera rápida y sencilla gracias a nuestra interfaz intuitiva. Además, puedes importar tus exámenes en formato JSON,facilitando la transferencia de contenido.'
    },
    {
        img: { alt: 'auto correction', src: '/img/undraw_up_to_date_re_nqid.svg' },
        reverse: true,
        title: 'Corrección Automática',
        body: 'La plataforma se encarga de corregir los exámenes de forma automática, permitiéndote recibir resultados inmediatos. Obtén tus puntuaciones sincomplicaciones y ahorra tiempo.'
    },
    {
        img: { alt: 'custom tests', src: '/img/survey.svg' },
        title: 'Personalización de Tests',
        body: 'Adapta cada examen a tus necesidades específicas. Puedes personalizar el número de preguntas, el formato y las opciones correctas, asegurandoque cada test sea único y pertinente.'
    },
    {
        img: { alt: 'easy share', src: '/img/undraw_server_push_re_303w.svg' },
        reverse: true,
        title: 'Compartir con Facilidad',
        body: 'Comparte tus exámenes de manera sencilla a través de un enlace único. Invita a amigos y compañeros a participar y a poner a prueba susconocimientos de forma efectiva.'
    },
    {
        img: { alt: 'stadistics', src: '/img/undraw_all_the_data_re_hh4w.svg' },
        title: 'Análisis de Resultados',
        body: 'Obtén estadísticas detalladas sobre el rendimiento de los participantes. Analiza los resultados para identificar áreas de mejora y ajustar tustests según sea necesario.'
    },
    {
        img: { alt: 'online', src: '/img/undraw_startup_life_re_8ow9.svg' },
        reverse: true,
        title: 'Accesibilidad en Línea',
        body: 'Accede a la plataforma desde cualquier dispositivo con conexión a Internet. Crea, realiza y corrige exámenes sin importar dónde te encuentres.'
    }
]
