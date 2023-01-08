package logging

import (
	"io"
	"os"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/pkgerrors"
)

type logConfig struct {
	level   string
	w       io.Writer
	service string
}

func JSONLogger(service, logLevel string) *zerolog.Logger {
	return getLogger(logConfig{
		level:   logLevel,
		w:       os.Stderr,
		service: service,
	})
}

func PrettyLogger(service, logLevel string) *zerolog.Logger {
	return getLogger(logConfig{
		level:   logLevel,
		w:       zerolog.ConsoleWriter{Out: os.Stdout, TimeFormat: time.RFC3339},
		service: service,
	})
}

func TestLogger() *zerolog.Logger {
	return getLogger(logConfig{
		level:   "info",
		w:       zerolog.ConsoleWriter{Out: os.Stdout, TimeFormat: time.RFC3339},
		service: "undefined",
	})
}

func getLogger(conf logConfig) *zerolog.Logger {
	logger := zerolog.New(conf.w).With().
		Str("service", conf.service).
		Timestamp().
		Logger()

	level, err := zerolog.ParseLevel(conf.level)
	if err != nil {
		panic(err)
	}

	zerolog.SetGlobalLevel(level)
	zerolog.ErrorStackMarshaler = pkgerrors.MarshalStack

	return &logger
}
